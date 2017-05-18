// monochord-core - created by Lajos Meszaros <m_lajos@hotmail.com> - MIT licence - last built on 2017-05-18
!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):e.MonochordCore=n()}(this,function(){"use strict";var e=function(){this.baseVolume=0,this.baseFrequency=440};return e.prototype.setBaseFrequency=function(e,n){this.baseFrequency=e},new e});
//# sourceMappingURL=monochord-core.js.map

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

var monochordCore = new MonochordCore();

return monochordCore;

})));
