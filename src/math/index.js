import {
  add,
  subtract,
  multiply,
  divide,
  curryN,
  memoize
} from 'ramda'
/*
import Big from 'big.js'
*/

const log = memoize(n => Math.log(n))
const floor = memoize(n => Math.floor(n))
const pow = curryN(2, memoize((n, exp) => Math.pow(n, exp)))
const logX = curryN(2, memoize((base, n) => divide(log(n), log(base))))

export {
  add,
  subtract,
  multiply,
  divide,
  log,
  floor,
  pow,
  logX
}
