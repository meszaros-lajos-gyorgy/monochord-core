const {
  add,
  subtract,
  multiply,
  divide,
  curryN,
  memoize
} = require('ramda')
// const Big = require('big.js')

// -----------------

const log = memoize(n => Math.log(n))
const floor = memoize(n => Math.floor(n))
const pow = curryN(2, memoize((n, exp) => Math.pow(n, exp)))
const logX = curryN(2, memoize((base, n) => divide(log(n), log(base))))

// -----------------

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  log,
  floor,
  pow,
  logX
}
