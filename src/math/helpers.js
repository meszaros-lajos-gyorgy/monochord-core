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
  compose,
  any,
  find,
  prop,
  slice
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

const wrapArity = curryN(2, (N, fn) => curryN(N, memoizeCalculation((...args) => compose(
  ifElse(
    any(Either.isLeft),
    find(Either.isLeft),
    compose(
      apply(fn),
      map(prop('value'))
    )
  ),
  slice(0, N),
  map(number)
)(args))))

const wrapUnary = wrapArity(1)
const wrapBinary = wrapArity(2)

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
  wrapArity,
  wrapUnary,
  wrapBinary,
  invert,
  ifThenElse
}
