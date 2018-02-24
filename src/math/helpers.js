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
  unless
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

  return function () {
    const key = toString(Array.from(arguments))

    if (!cache.hasOwnProperty(key)) {
      cache[key] = fn.apply(this, arguments)
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

const invert = fn => (...args) => when(
  Either.isRight,
  either => either.map(not)
)(apply(fn, args))

const ifThenElse = (fn, onTrue, onFalse) => (...args) => {
  const checkResult = apply(fn, args)
  if (checkResult.isLeft) {
    return checkResult
  } else {
    return number(apply(checkResult.value ? onTrue : onFalse, args))
  }
}

export {
  cloneNumber,
  memoizeCalculation,
  number,
  wrapUnary,
  wrapBinary,
  invert,
  ifThenElse
}
