import {
  ifElse,
  when,
  is,
  toString,
  both,
  propIs,
  complement,
  curryN,
  not,
  apply,
  unless,
  map,
  compose
} from 'ramda'

import {
  Either
} from 'ramda-fantasy'

import Decimal from 'decimal.js'

import {
  Errors
} from './constants'

const cloneNumber = src => src.map(num => new Decimal(num))

const memoizeCalculation = fn => {
  const cache = {}

  return (...args) => {
    const key = toString(args)

    if (!cache.hasOwnProperty(key)) {
      cache[key] = apply(fn, args)
    }

    return unless(
      propIs(Boolean, 'value'),
      cloneNumber
    )(cache[key])
  }
}

const number = ifElse(
  is(Either),
  when(
    both(Either.isRight, complement(propIs)(Decimal, 'value')),
    src => Either.Left(Errors.INVALID_NUMBER)
  ),
  src => {
    try {
      return Either.Right(new Decimal(src))
    } catch (e) {
      return Either.Left(Errors.INVALID_NUMBER)
    }
  }
)

const wrapUnary = fn => memoizeCalculation(a => {
  const numA = number(a)

  if (numA.isLeft) {
    return numA
  } else {
    return fn(numA.value)
  }
})
const wrapBinary = fn => curryN(2, memoizeCalculation((a, b) => {
  const numA = number(a)
  const numB = number(b)

  if (numA.isLeft) {
    return numA
  } else if (numB.isLeft) {
    return numB
  } else {
    return fn(numA.value, numB.value)
  }
}))

const invert = fn => memoizeCalculation((...args) => when(
  Either.isRight,
  either => either.map(not)
)(apply(fn, args)))

const ifThenElse = curryN(3, (fn, onTrue, onFalse) => memoizeCalculation((...args) => {
  const checkResult = apply(fn, args)
  if (checkResult.isLeft) {
    return checkResult
  } else {
    return compose(
      when(Either.isRight, cloneNumber),
      apply(checkResult.value ? onTrue : onFalse),
      map(number)
    )(args)
  }
}))

export {
  cloneNumber,
  memoizeCalculation,
  number,
  wrapUnary,
  wrapBinary,
  invert,
  ifThenElse
}
