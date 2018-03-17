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
  slice,
  either
} from 'ramda'

import {
  Either
} from 'ramda-fantasy'

import Decimal from 'decimal.js'

import {
  Errors
} from './constants/errors'

import * as numbers from './numbers'

const cloneNumber = src => src.map(num => new Decimal(num))

const memoizeCalculation = fn => {
  const cache = {}

  return (...args) => {
    const key = toString(args)

    if (!cache.hasOwnProperty(key)) {
      cache[key] = apply(fn, args)
    }

    return unless(
      either(is(Array), propIs(Boolean, 'value')),
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
  numbers.apply(fn),
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
      apply(checkResult.value ? onTrue : onFalse),
      map(number)
    )(args)
  }
}))

const unfold = curryN(2, function (fn, seed) {
  if (Either.isLeft(seed)) {
    return seed
  } else {
    let pair = fn(seed)
    const result = []

    while (pair && pair.length) {
      result[result.length] = pair[0]
      pair = fn(pair[1])
    }

    return result
  }
})

export {
  cloneNumber,
  memoizeCalculation,
  number,
  wrapArity,
  wrapUnary,
  wrapBinary,
  invert,
  ifThenElse,
  unfold
}
