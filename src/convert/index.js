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
  sort,
  reduce,
  all,
  contains,
  append,
  findIndex,
  remove,
  head,
  tail,
  curry
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

const withoutOnce = curry((element, array) => remove(findIndex(equals(element), array), 1, array))

function greatestCommonDivisor () {
  const factorsOfNumbers = compose(
    sort((a, b) => a.length - b.length), // ascending
    map(getPrimeFactors),
    Array.from
  )(arguments)

  let numbers = tail(factorsOfNumbers)

  return compose(
    reduce(multiply, 1),
    reduce((factors, factor) => {
      if (all(contains(factor), numbers)) {
        // TODO: the line below changes the values on "numbers". Need another way to do this
        numbers = map(withoutOnce(factor), numbers)

        return append(factor, factors)
      } else {
        return factors
      }
    }, []),
    head
  )(factorsOfNumbers)
}

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

  multiplier /= greatestCommonDivisor(fraction * multiplier, multiplier)

  return [fraction * multiplier, multiplier]
}

export {
  leastFactor,
  getPrimeFactors,
  greatestCommonDivisor,
  getRepeatingDecimal,
  fractionToCents,
  centsToFraction,
  ratioToFraction,
  fractionToRatio
}
