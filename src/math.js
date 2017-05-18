import {
  adjust,
  negate,
  not
} from 'ramda'

const isInteger = n => n % 1 === 0

const isPrime = x => {
  let result = true

  if (isNaN(x) || !isFinite(x) || !isInteger(x) || x < 2) {
    result = false
  } else if (x % 2 === 0) {
    result = x === 2
  } else if (x % 3 === 0) {
    result = x === 3
  } else {
    const m = Math.sqrt(x)

    for (let i = 5; i <= m; i += 6) {
      if (x % i === 0 || x % (i + 2) === 0) {
        result = false
        break
      }
    }
  }

  return result
}

const leastFactor = n => {
  let result = n

  if (isNaN(n) || typeof n === 'boolean' || !isFinite(n) || !isInteger(n)) {
    result = NaN
  } else {
    if (n === 0) {
      result = 0
    } else if (n % 1 || n * n < 2) {
      result = 1
    } else if (n % 2 === 0) {
      result = 2
    } else if (n % 3 === 0) {
      result = 3
    } else if (n % 5 === 0) {
      result = 5
    } else {
      const m = Math.sqrt(n)

      for (let i = 7; i <= m; i += 30) {
        if (n % i === 0) {
          result = i
          break
        } else if (n % (i + 4) === 0) {
          result = i + 4
          break
        } else if (n % (i + 6) === 0) {
          result = i + 6
          break
        } else if (n % (i + 10) === 0) {
          result = i + 10
          break
        } else if (n % (i + 12) === 0) {
          result = i + 12
          break
        } else if (n % (i + 16) === 0) {
          result = i + 16
          break
        } else if (n % (i + 22) === 0) {
          result = i + 22
          break
        } else if (n % (i + 24) === 0) {
          result = i + 24
          break
        }
      }
    }
  }

  return result
}

const getPrimeFactors = n => {
  let result = []

  if (not(isNaN(n) || typeof n === 'boolean' || !isFinite(n) || !isInteger(n) || n === 0)) {
    if (n < 0) {
      result = adjust(negate, 0, getPrimeFactors(-n))
    } else {
      const minFactor = leastFactor(n)
      result = [minFactor].concat(n === minFactor ? [] : getPrimeFactors(n / minFactor))
    }
  }

  return result
}

export {
  isPrime,
  leastFactor,
  getPrimeFactors
}

/*
const sortArrSizeAsc = (a, b) => {
  return a.length - b.length;
}

var cache = {
  f2c : {}, // fraction to cache
  c2f : {}  // cache to fraction
};

// num1, num2, ...
function greatestCommonDivisor(){
  var numbers = Array.prototype.slice.call(arguments);
  var numbersSize = numbers.length;
  var factors = [];
  var i = numbersSize;
  var gcd = 1;
  var j, firstNumber, factor, notContaining;

  while(i--){
    numbers[i] = getPrimeFactors(numbers[i]);
  }
  numbers.sort(sortArrSizeAsc);

  numbersSize--;
  firstNumber = numbers.shift();
  i = firstNumber.length;
  while(i--){
    factor = firstNumber[i];
    notContaining = numbers.some(function(number){
      return number.indexOf(factor) === -1;
    });
    if(!notContaining){
      j = numbersSize;
      while(j--){
        numbers[j].splice(numbers[j].indexOf(factor), 1);
      }
      factors.push(factor);
    }
  }

  i = factors.length;
  while(i--){
    gcd *= factors[i];
  }
  return gcd;
}

// http://stackoverflow.com/a/10803250/1806628
function getRepeatingDecimal(fraction){
  fraction += '';
  var RE_PatternInRepeatDec = /(?:[^\.]+\.\d*)(\d{2,})+(?:\1)$/;
  var RE_RepeatingNums = /^(\d+)(?:\1)$/;
  var match = RE_PatternInRepeatDec.exec(fraction);

  if(!match){
    // Try again but take off last digit incase of precision error.
    fraction = fraction.replace(/\d$/, '');
    match = RE_PatternInRepeatDec.exec(fraction);
  }

  if(match && match.length > 1){
    // Reset the match[1] if there is a pattern inside the matched pattern.
    match[1] = RE_RepeatingNums.test(match[1]) ? RE_RepeatingNums.exec(match[1])[1] : match[1];
  }

  return match ? match[1] : null;
}

function fractionToCents(fraction){
  if(!cache.f2c.hasOwnProperty(fraction)){
    cache.f2c[fraction] = 1200 * Math.log(fraction) / Math.LN2;
  }
  return cache.f2c[fraction];
}

function centsToFraction(cents){
  if(!cache.c2f.hasOwnProperty(cents)){
    cache.c2f[cents] = Math.pow(2, (cents / 1200));
  }
  return cache.c2f[cents];
}

function fractionToRatio(fraction){
  if(Number.isInteger(fraction)){
    return [fraction, 1];
  }

  var repetition = getRepeatingDecimal(fraction);
  var multiplier = (
    repetition !== null
    ? Math.pow(10, repetition.length) - 1
    : Math.pow(10, (fraction + '').split('.')[1].length)
  );

  multiplier /= greatestCommonDivisor(fraction * multiplier, multiplier);

  return [fraction * multiplier, multiplier];
}

function ratioToFraction(f1, f2){
  return f2 > f1 ? (f2 / f1) : (f1 / f2);
}

return {
  greatestCommonDivisor,
  getRepeatingDecimal,
  fractionToCents,
  centsToFraction,
  fractionToRatio,
  ratioToFraction
};
*/
