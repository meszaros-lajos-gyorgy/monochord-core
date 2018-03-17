import {
  compose,
  converge,
  nthArg,
  unless,
  flip,
  curryN,
  always,
  __,
  adjust,
  of,
  concat
} from 'ramda'

import {
  Either
} from 'ramda-fantasy'

import {
  intersectionWithRepeats,
  topWithRepeats
} from './sets'

import {
  number,
  ifThenElse
} from './helpers'

import * as numbers from './numbers'

import {
  product,
  isInteger,
  isZero,
  equals,
  modulo,
  add,
  sqrt,
  isNegative,
  negate,
  divide,
  lt,
  ceil
} from './basic'

import {
  Errors
} from './constants/errors'

import {
  lowPrimes,
  nextPrime
} from './constants/primes'

// -----------------

const checkArgument = (n, fn) => ifThenElse(
  compose(Either.Right, Either.isRight, nthArg(n)),
  fn,
  nthArg(n)
)

const isDivisableBy = curryN(2, checkArgument(0, checkArgument(1, compose(isZero, flip(modulo)))))

const smallestFactor = ifThenElse(
  equals(1),
  always(number(1)),
  n => {
    let val = numbers.find(isDivisableBy(__, n), lowPrimes)

    if (val.value === null) {
      const end = ceil(sqrt(n))
      for (let i = nextPrime; lt(i, end).value; i = add(i, 2)) {
        if (isDivisableBy(i, n).value) {
          val = i
          break
        }
      }
    }

    return val.value === null ? n : val
  }
)

const getPrimeFactors = unless(
  Either.isLeft,
  ifThenElse(
    isInteger,
    ifThenElse(
      isZero,
      always([]),
      ifThenElse(
        isNegative,
        n => adjust(negate, 0, getPrimeFactors(negate(n))),
        n => compose(
          ifThenElse(
            equals(n),
            of,
            converge(concat, [
              of,
              compose(getPrimeFactors, divide(n))
            ])
          ),
          smallestFactor
        )(n)
      )
    ),
    always(Either.Left(Errors.INTEGER_REQUIRED))
  )
)

const findGreatestCommonDivisor = compose(
  product,
  converge(intersectionWithRepeats, [
    compose(getPrimeFactors, nthArg(0)),
    compose(getPrimeFactors, nthArg(1))
  ])
)

const findLeastCommonMultiple = compose(
  product,
  converge(topWithRepeats, [
    compose(getPrimeFactors, nthArg(0)),
    compose(getPrimeFactors, nthArg(1))
  ])
)

// -----------------

export {
  isDivisableBy,
  smallestFactor,
  getPrimeFactors,
  findGreatestCommonDivisor,
  findLeastCommonMultiple
}
