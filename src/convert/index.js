// http://www.sengpielaudio.com/calculator-centsratio.htm

import {
  compose,
  memoize,
  __,
  negate,
  adjust,
  concat,
  of,
  ifElse,
  equals,
  converge,
  map,
  reduce,
  append,
  findIndex,
  head,
  tail,
  curry,
  union,
  inc,
  identity,
  flatten,
  apply,
  repeat,
  zip,
  zipWith,
  min,
  max
} from 'ramda'

import {
  logX,
  multiply,
  divide,
  pow
} from '../math/index'
import {
  octaveRatio
} from '../midi/constants'

const leastFactor = n => {
  let ret = n

  if (!Number.isInteger(n)) {
    ret = NaN
  } else if (n === 0) {
    ret = 0
  } else if (n * n < 2) {
    ret = 1
  } else if (n % 2 === 0) {
    ret = 2
  } else if (n % 3 === 0) {
    ret = 3
  } else if (n % 5 === 0) {
    ret = 5
  } else {
    const m = Math.sqrt(n)
    for (let i = 7; i <= m; i += 30) {
      if (n % i === 0) {
        ret = i
        break
      } else if (n % (i + 4) === 0) {
        ret = i + 4
        break
      } else if (n % (i + 6) === 0) {
        ret = i + 6
        break
      } else if (n % (i + 10) === 0) {
        ret = i + 10
        break
      } else if (n % (i + 12) === 0) {
        ret = i + 12
        break
      } else if (n % (i + 16) === 0) {
        ret = i + 16
        break
      } else if (n % (i + 22) === 0) {
        ret = i + 22
        break
      } else if (n % (i + 24) === 0) {
        ret = i + 24
        break
      }
    }
  }

  return ret
}

const getPrimeFactors = n => {
  let ret = []

  if (Number.isInteger(n) && n !== 0) {
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
}

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

const fractionToCents = memoize(compose(multiply(1200), logX(octaveRatio)))
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

export {
  leastFactor,
  getPrimeFactors,
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
}
