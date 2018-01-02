import {
  ifElse,
  when,
  is,
  toString,
  both,
  propIs,
  complement
} from 'ramda'

import {
  Either
} from 'ramda-fantasy'

import Big from 'big.js'

import {
  Errors
} from './constants'

const cloneNumber = src => src.map(num => new Big(num))

const memoizeCalculation = fn => {
  const cache = {}

  return function () {
    const key = toString(arguments)

    if (!cache.hasOwnProperty(key)) {
      cache[key] = fn.apply(this, arguments)
    }

    return cloneNumber(cache[key])
  }
}

const number = ifElse(
  is(Either),
  when(
    both(Either.isRight, complement(propIs)(Big, 'value')),
    src => Either.Left(Errors.INVALID_NUMBER)
  ),
  src => {
    try {
      return Either.Right(new Big(src))
    } catch (e) {
      return Either.Left(Errors.INVALID_NUMBER)
    }
  }
)

export {
  cloneNumber,
  memoizeCalculation,
  number
}
