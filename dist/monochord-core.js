// monochord-core - created by Lajos Meszaros <m_lajos@hotmail.com> - MIT licence - last built on 2017-08-04
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.MonochordCore = {})));
}(this, (function (exports) { 'use strict';

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

var MonochordCore = function MonochordCore () {
  this.baseVolume = 0;
  this.baseFrequency = 440;
};

MonochordCore.prototype.setBaseFrequency = function setBaseFrequency (newFrequency, keyNote) {
  this.baseFrequency = newFrequency;
};

Object.defineProperty(exports, '__esModule', { value: true });

})));
