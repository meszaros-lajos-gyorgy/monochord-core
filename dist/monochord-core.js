// monochord-core - created by Lajos Meszaros <m_lajos@hotmail.com> - MIT licence - last built on 2017-06-15
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.MonochordCore = factory());
}(this, (function () { 'use strict';

/**
 * Private `concat` function to merge two array-like objects.
 *
 * @private
 * @param {Array|Arguments} [set1=[]] An array-like object.
 * @param {Array|Arguments} [set2=[]] An array-like object.
 * @return {Array} A new, merged array.
 * @example
 *
 *      _concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
 */
var _concat = function _concat(set1, set2) {
  set1 = set1 || [];
  set2 = set2 || [];
  var idx;
  var len1 = set1.length;
  var len2 = set2.length;
  var result = [];

  idx = 0;
  while (idx < len1) {
    result[result.length] = set1[idx];
    idx += 1;
  }
  idx = 0;
  while (idx < len2) {
    result[result.length] = set2[idx];
    idx += 1;
  }
  return result;
};

var _isPlaceholder = function _isPlaceholder(a) {
  return a != null &&
         typeof a === 'object' &&
         a['@@functional/placeholder'] === true;
};

/**
 * Optimized internal one-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
var _curry1 = function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0 || _isPlaceholder(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
};

/**
 * Optimized internal two-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
var _curry2 = function _curry2(fn) {
  return function f2(a, b) {
    switch (arguments.length) {
      case 0:
        return f2;
      case 1:
        return _isPlaceholder(a) ? f2
             : _curry1(function(_b) { return fn(a, _b); });
      default:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f2
             : _isPlaceholder(a) ? _curry1(function(_a) { return fn(_a, b); })
             : _isPlaceholder(b) ? _curry1(function(_b) { return fn(a, _b); })
             : fn(a, b);
    }
  };
};

/**
 * Optimized internal three-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
var _curry3 = function _curry3(fn) {
  return function f3(a, b, c) {
    switch (arguments.length) {
      case 0:
        return f3;
      case 1:
        return _isPlaceholder(a) ? f3
             : _curry2(function(_b, _c) { return fn(a, _b, _c); });
      case 2:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f3
             : _isPlaceholder(a) ? _curry2(function(_a, _c) { return fn(_a, b, _c); })
             : _isPlaceholder(b) ? _curry2(function(_b, _c) { return fn(a, _b, _c); })
             : _curry1(function(_c) { return fn(a, b, _c); });
      default:
        return _isPlaceholder(a) && _isPlaceholder(b) && _isPlaceholder(c) ? f3
             : _isPlaceholder(a) && _isPlaceholder(b) ? _curry2(function(_a, _b) { return fn(_a, _b, c); })
             : _isPlaceholder(a) && _isPlaceholder(c) ? _curry2(function(_a, _c) { return fn(_a, b, _c); })
             : _isPlaceholder(b) && _isPlaceholder(c) ? _curry2(function(_b, _c) { return fn(a, _b, _c); })
             : _isPlaceholder(a) ? _curry1(function(_a) { return fn(_a, b, c); })
             : _isPlaceholder(b) ? _curry1(function(_b) { return fn(a, _b, c); })
             : _isPlaceholder(c) ? _curry1(function(_c) { return fn(a, b, _c); })
             : fn(a, b, c);
    }
  };
};

/**
 * Applies a function to the value at the given index of an array, returning a
 * new copy of the array with the element at the given index replaced with the
 * result of the function application.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig (a -> a) -> Number -> [a] -> [a]
 * @param {Function} fn The function to apply.
 * @param {Number} idx The index.
 * @param {Array|Arguments} list An array-like object whose value
 *        at the supplied index will be replaced.
 * @return {Array} A copy of the supplied array-like object with
 *         the element at index `idx` replaced with the value
 *         returned by applying `fn` to the existing element.
 * @see R.update
 * @example
 *
 *      R.adjust(R.add(10), 1, [1, 2, 3]);     //=> [1, 12, 3]
 *      R.adjust(R.add(10))(1)([1, 2, 3]);     //=> [1, 12, 3]
 * @symb R.adjust(f, -1, [a, b]) = [a, f(b)]
 * @symb R.adjust(f, 0, [a, b]) = [f(a), b]
 */
var adjust = _curry3(function adjust(fn, idx, list) {
  if (idx >= list.length || idx < -list.length) {
    return list;
  }
  var start = idx < 0 ? list.length : 0;
  var _idx = start + idx;
  var _list = _concat(list);
  _list[_idx] = fn(list[_idx]);
  return _list;
});

/**
 * Negates its argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Math
 * @sig Number -> Number
 * @param {Number} n
 * @return {Number}
 * @example
 *
 *      R.negate(42); //=> -42
 */
var negate = _curry1(function negate(n) { return -n; });

/**
 * A function that returns the `!` of its argument. It will return `true` when
 * passed false-y value, and `false` when passed a truth-y one.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig * -> Boolean
 * @param {*} a any value
 * @return {Boolean} the logical inverse of passed argument.
 * @see R.complement
 * @example
 *
 *      R.not(true); //=> false
 *      R.not(false); //=> true
 *      R.not(0); //=> true
 *      R.not(1); //=> false
 */
var not = _curry1(function not(a) {
  return !a;
});

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

var monochordCore = new MonochordCore();

return monochordCore;

})));
