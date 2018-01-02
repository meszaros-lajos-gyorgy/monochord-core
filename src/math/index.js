import {
  is,
  unless,
  toString
} from 'ramda'

import {
  Either
} from 'ramda-fantasy'

import Big from 'big.js'

// -----------------

/*
const RoundModes = {
  ROUND_DOWN: 0,
  ROUND_HALF_UP: 1,
  ROUND_HALF_EVEN: 2,
  ROUND_UP: 3
}
*/

const Errors = Object.freeze({
  INVALID_NUMBER: 0x01
})

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

const number = unless(
  is(Either),
  src => {
    try {
      return Either.Right(new Big(src))
    } catch (e) {
      return Either.Left(Errors.INVALID_NUMBER)
    }
  }
)

const inc = memoizeCalculation(num => number(num).map(val => val.plus(1)))

/*
const add = curryN(2, memoize((a, b) => {
  return Big(a).plus(b)
}))

const subtract = curryN(2, memoize((a, b) => {
  return Big(a).minus(b)
}))

const multiply = curryN(2, memoize((a, b) => {
  return Big(a).times(b)
}))

const divide = curryN(2, memoize((a, b) => {
  return Big(a).div(b)
}))

const modulo = curryN(2, memoize((a, b) => {
  return Big(a).mod(b)
}))

const log = memoize(n => {
  return Math.log(n)
})

const floor = memoize(n => {
  return Big(n).round(0, RoundModes.ROUND_DOWN)
})

const pow = curryN(2, memoize((n, exp) => {
  // return Big(n).pow(exp)
  return Math.pow(n, exp)
}))

const sqrt = memoize(n => {
  return Big(n).sqrt()
})

const logN = curryN(2, memoize((base, n) => {
  return divide(log(n), log(base))
}))

const equals = curryN(2, memoize((a, b) => {
  return Big(a).eq(b)
}))

const lt = curryN(2, memoize((a, b) => {
  return Big(a).lt(b)
}))

const inc = add('1')
const dec = add('-1')

const negate = multiply(-1)
*/

// -----------------

export {
  Errors,
  cloneNumber,
  memoizeCalculation,
  number,
  inc
  /*
  add
  subtract,
  multiply,
  divide,
  modulo,
  log,
  floor,
  pow,
  sqrt,
  logN,
  equals,
  lt,
  inc,
  dec,
  negate
  */
}
