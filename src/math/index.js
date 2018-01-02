import {
  wrapBinary
} from './number'

import {
  Errors
} from './constants'

import {
  Either
} from 'ramda-fantasy'

// -----------------

// const add = wrapBinary((a, b) => a.plus(b))
const add = wrapBinary((a, b) => {
  try {
    return Either.Right(a.plus(b))
  } catch (e) {
    return Either.Left(Errors.INVALID_NUMBER)
  }
})

const inc = add(1)

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
  add,
  inc

  /*
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
  dec,
  negate
  */
}
