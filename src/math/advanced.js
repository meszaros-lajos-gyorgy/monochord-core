import {
  compose,
  converge,
  nthArg
} from 'ramda'

import {
  intersectionWithRepeats,
  topWithRepeats
} from './sets'

import * as numbers from './numbers'

import {
  number
} from './helpers'

import {
  multiply
} from './basic'

// -----------------

const product = numbers.reduce(multiply, number(1))

const getPrimeFactors = n => {
  // TODO 2nd
  return []
}

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
  product,
  getPrimeFactors,
  findGreatestCommonDivisor,
  findLeastCommonMultiple
}
