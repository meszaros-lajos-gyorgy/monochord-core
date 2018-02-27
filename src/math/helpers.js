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
  all,
  find,
  slice,
  pluck,
  converge,
  defaultTo,
  prop,
  of
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

const numbers = {
  isValid: all(Either.isRight),
  getValues: pluck('value'),
  getLeft: find(Either.isLeft)
}

numbers.apply = curryN(2, (fn, arr) => converge(defaultTo, [
  compose(
    apply(fn),
    numbers.getValues
  ),
  numbers.getLeft
])(arr))

numbers.flatMap = curryN(2, (fn, arr) => when(
  numbers.isValid,
  map(compose(
    apply(fn),
    of,
    prop('value')
  ))
)(arr))
numbers.map = curryN(2, (fn, arr) => when(
  numbers.isValid,
  map(fn)
)(arr))

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
  numbers,
  wrapArity,
  wrapUnary,
  wrapBinary,
  invert,
  ifThenElse
}
