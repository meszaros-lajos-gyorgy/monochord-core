import {
  compose,
  append,
  of,
  converge,
  adjust,
  findIndex,
  head,
  identity,
  prop,
  when,
  zip,
  zipWith
  /*
  union,
  curry,
  reduce,
  flatten,
  apply,
  repeat,
  zipWith,
  min, //
  max //
  */
} from 'ramda'

/*
import {
  Either
} from 'ramda-fantasy'
*/

import * as numbers from './numbers'

import {
  number
} from './helpers'

import {
  inc,
  equals
} from './basic'

// -----------------

const toCounterPairs = numbers.map(compose(
  append(number(0)),
  of
))

const addToCounterPairs = (counters, value) => when(
  numbers.isValidDeep,
  converge(
    adjust(adjust(inc, 1)),
    [
      findIndex(compose(
        prop('value'),
        equals(value),
        head
      )),
      identity
    ]
  )
)(counters)

const concatCounter = compose(adjust(head, 0), zip)
const concatCounters = when(
  numbers.isValidDeep,
  zipWith(concatCounter)
)

/*
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
*/

// -----------------

export {
  toCounterPairs,
  addToCounterPairs,
  concatCounter,
  concatCounters
  /*
  setOperationWithRepeats,
  intersectionWithRepeats,
  unionWithRepeats
  */
}
