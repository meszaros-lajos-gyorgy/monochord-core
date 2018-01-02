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

const add = wrapBinary((a, b) => {
  try {
    return Either.Right(a.plus(b))
  } catch (e) {
    return Either.Left(Errors.INVALID_NUMBER)
  }
})

const subtract = wrapBinary((a, b) => {
  try {
    return Either.Right(a.minus(b))
  } catch (e) {
    return Either.Left(Errors.INVALID_NUMBER)
  }
})

const multiply = wrapBinary((a, b) => {
  try {
    return Either.Right(a.times(b))
  } catch (e) {
    return Either.Left(Errors.INVALID_NUMBER)
  }
})

const divide = wrapBinary((a, b) => {
  try {
    return Either.Right(a.div(b))
  } catch (e) {
    let err
    switch (e) {
      case 'Division by zero':
        err = Errors.DIVISION_BY_ZERO
        break
      case 'Invalid decimal places':
        err = Errors.INVALID_DECIMAL_PLACES
        break
      case 'Invalid rounding mode':
        err = Errors.INVALID_ROUNDING_MODE
        break
    }
    return Either.Left(err)
  }
})

const modulo = wrapBinary((a, b) => {
  try {
    return Either.Right(a.mod(b))
  } catch (e) {
    return Either.Left(Errors.DIVISION_BY_ZERO)
  }
})

const inc = add(1)
const dec = add(-1)
const negate = multiply(-1)

/*
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
*/

// -----------------

export {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  inc,
  dec,
  negate

  /*
  log,
  floor,
  pow,
  sqrt,
  logN,
  equals,
  lt,
  */
}
