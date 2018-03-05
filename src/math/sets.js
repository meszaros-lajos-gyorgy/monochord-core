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
  zipWith,
  nthArg,
  ifElse,
  curry,
  flatten,
  apply,
  repeat,
  toString,
  map
  /*
  reduce,
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
  /*
  min,
  max
  */
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

const concatCounter = compose(
  adjust(head, 0),
  zip
)

const concatCounters = ifElse(
  compose(
    numbers.isValidDeep,
    nthArg(0)
  ),
  ifElse(
    compose(
      numbers.isValidDeep,
      nthArg(1)
    ),
    zipWith(concatCounter),
    nthArg(1)
  ),
  nthArg(0)
)

const groupCountsWith = curry((fn, arr) => when(
  numbers.isValidDeep,
  map(adjust(apply(fn), 1))
)(arr))

const expandCounters = when(
  numbers.isValidDeep,
  compose(
    flatten,
    map(compose(
      apply(repeat),
      adjust(compose(toString, prop('value')), 1)
    ))
  )
)

/*
const setOperationWithRepeats = curry((fn, a, b) => {
  const counter = compose(toCounterPairs, numbers.union)(a, b)
  const factoredA = reduce(addToCounterPairs, counter, a)
  const factoredB = reduce(addToCounterPairs, counter, b)

  return compose(
    expandCounters,
    groupCountsWith(fn),
    concatCounters
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
  concatCounters,
  groupCountsWith,
  expandCounters
  /*
  setOperationWithRepeats,
  intersectionWithRepeats,
  unionWithRepeats
  */
}
