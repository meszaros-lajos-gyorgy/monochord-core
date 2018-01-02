import {
  ifElse,
  when,
  is,
  toString,
  both,
  propIs,
  complement,
  curryN
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
    const key = toString(Array.from(arguments))

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

export {
  cloneNumber,
  memoizeCalculation,
  number,
  wrapUnary,
  wrapBinary
}
