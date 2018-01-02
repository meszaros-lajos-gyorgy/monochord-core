// http://www.sengpielaudio.com/calculator-centsratio.htm

/*
import {
  compose,
  memoize,
  __,
  adjust,
  concat,
  of,
  ifElse,
  converge,
  curry,
  defaultTo,
  find,
  flatten,
  map,
  unfold
  reduce,
  append,
  findIndex,
  head,
  tail,
  union,
  inc,
  identity,
  apply,
  repeat,
  zip,
  zipWith,
  min,
  max
} from 'ramda'

import {
  logN,
  multiply,
  add,
  divide,
  equals,
  lt,
  modulo,
  pow,
  sqrt,
  negate
} from '../math/index'

import {
  octaveRatio
} from '../midi/constants'
*/

// -----------------

/*
const isZero = equals(0)
const canDivideWith = curry((divisor, number) => compose(isZero, modulo(number, divisor)))
const step30 = curry((m, n) => n > m ? false : [n, n + 30])

const leastFactor = memoize(n => {
  let ret

  if (!Number.isInteger(n)) {
    ret = NaN
  } else if (isZero(n)) {
    ret = 0
  } else if (lt(pow(n, 2), 2)) {
    ret = 1
  } else if (canDivideWith(2, n)) {
    ret = 2
  } else if (canDivideWith(3, n)) {
    ret = 3
  } else if (canDivideWith(5, n)) {
    ret = 5
  } else {
    ret = defaultTo(
      find(
        canDivideWith(__, n),
        flatten(
          map(
            compose(
              map(__, [0, 4, 6, 10, 12, 16, 22, 24]),
              add
            ),
            unfold(
              step30(sqrt(n)),
              7
            )
          )
        )
      ),
      n
    )
  }

  return ret
})

const getPrimeFactors = memoize(n => {
  let ret = []

  if (Number.isInteger(n) && !isZero(n)) {
    if (n < 0) {
      ret = adjust(negate, 0, getPrimeFactors(-n))
    } else {
      ret = compose(
        ifElse(
          equals(n),
          of,
          converge(concat, [
            of,
            compose(getPrimeFactors, divide(n))
          ])
        ),
        leastFactor
      )(n)
    }
  }

  return ret
})

const toCounterPairs = map(compose(append(0), of))
const addToCounterPairs = (counters, value) => converge(adjust(adjust(inc, 1)), [findIndex(compose(equals(value), head)), identity])(counters)
const concatCounters = compose(adjust(head, 0), zip)

const setOperationWithRepeats = curry((fn, a, b) => {
  const counter = compose(toCounterPairs, union)(a, b)
  const factoredA = reduce(addToCounterPairs, counter, a)
  const factoredB = reduce(addToCounterPairs, counter, b)

  return compose(
    flatten,
    map(compose(
      apply(repeat),
      adjust(apply(fn), 1)
    )),
    zipWith(concatCounters)
  )(factoredA, factoredB)
})

const intersectionWithRepeats = setOperationWithRepeats(min)
const unionWithRepeats = setOperationWithRepeats(max)

const findGreatestCommonDivisor = compose(
  reduce(multiply, 1),
  converge(reduce(intersectionWithRepeats), [head, tail]),
  map(getPrimeFactors)
)

const findLeastCommonMultiple = compose(
  reduce(multiply, 1),
  converge(reduce(unionWithRepeats), [head, tail]),
  map(getPrimeFactors)
)

// http://stackoverflow.com/a/10803250/1806628
function getRepeatingDecimal (fraction) {
  fraction += ''
  var RePatternInRepeatDec = /(?:[^.]+\.\d*)(\d{2,})+(?:\1)$/
  var ReRepeatingNums = /^(\d+)(?:\1)$/
  var match = RePatternInRepeatDec.exec(fraction)

  if (!match) {
    // Try again but take off last digit incase of precision error.
    fraction = fraction.replace(/\d$/, '')
    match = RePatternInRepeatDec.exec(fraction)
  }

  if (match && match.length > 1) {
    // Reset the match[1] if there is a pattern inside the matched pattern.
    match[1] = ReRepeatingNums.test(match[1]) ? ReRepeatingNums.exec(match[1])[1] : match[1]
  }

  return match ? match[1] : null
}

const fractionToCents = memoize(compose(multiply(1200), logN(octaveRatio)))
const centsToFraction = memoize(compose(pow(octaveRatio), divide(__, 1200)))

const ratioToFraction = divide
const fractionToRatio = fraction => {
  if (Number.isInteger(fraction)) {
    return [fraction, 1]
  }

  var repetition = getRepeatingDecimal(fraction)
  var multiplier = (
    repetition !== null
    ? Math.pow(10, repetition.length) - 1
    : Math.pow(10, fraction.toString().split('.')[1].length)
  )

  multiplier /= findGreatestCommonDivisor([fraction * multiplier, multiplier])

  return [fraction * multiplier, multiplier]
}
*/

// -----------------

export {
  /*
  leastFactor,
  getPrimeFactors
  toCounterPairs,
  addToCounterPairs,
  concatCounters,
  setOperationWithRepeats,
  intersectionWithRepeats,
  unionWithRepeats,
  findGreatestCommonDivisor,
  findLeastCommonMultiple,
  getRepeatingDecimal,
  fractionToCents,
  centsToFraction,
  ratioToFraction,
  fractionToRatio
  */
}
