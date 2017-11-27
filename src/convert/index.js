// http://www.sengpielaudio.com/calculator-centsratio.htm

import {
  compose,
  memoize,
  __
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

function leastFactor (n) {
  if (!Number.isInteger(n)) {
    return NaN
  }
  if (n === 0) {
    return 0
  }
  if (n % 1 || n * n < 2) {
    return 1
  }
  if (n % 2 === 0) {
    return 2
  }
  if (n % 3 === 0) {
    return 3
  }
  if (n % 5 === 0) {
    return 5
  }
  var m = Math.sqrt(n)
  for (var i = 7; i <= m; i += 30) {
    if (n % i === 0) return i
    if (n % (i + 4) === 0) return i + 4
    if (n % (i + 6) === 0) return i + 6
    if (n % (i + 10) === 0) return i + 10
    if (n % (i + 12) === 0) return i + 12
    if (n % (i + 16) === 0) return i + 16
    if (n % (i + 22) === 0) return i + 22
    if (n % (i + 24) === 0) return i + 24
  }
  return n
}

function getPrimeFactors (n) {
  if (!Number.isInteger(n) || n % 1 || n === 0) {
    return []
  }
  if (n < 0) {
    var factors = getPrimeFactors(-n)
    factors[0] *= -1
    return factors
  }
  var minFactor = leastFactor(n)
  if (n === minFactor) {
    return [n]
  }
  return [minFactor].concat(getPrimeFactors(n / minFactor))
}

function greatestCommonDivisor (/* num1, num2, ... */) {
  var numbers = Array.prototype.slice.call(arguments)
  var numbersSize = numbers.length
  var factors = []
  var i = numbersSize
  var gcd = 1
  var j, firstNumber, factor, notContaining

  while (i--) {
    numbers[i] = getPrimeFactors(numbers[i])
  }
  numbers.sort((a, b) => a.length - b.length)

  numbersSize--
  firstNumber = numbers.shift()
  i = firstNumber.length
  while (i--) {
    factor = firstNumber[i]
    notContaining = numbers.some(function (number) {
      return number.indexOf(factor) === -1
    })
    if (!notContaining) {
      j = numbersSize
      while (j--) {
        numbers[j].splice(numbers[j].indexOf(factor), 1)
      }
      factors.push(factor)
    }
  }

  i = factors.length
  while (i--) {
    gcd *= factors[i]
  }
  return gcd
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
