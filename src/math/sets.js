import {
  map,
  compose,
  append,
  of,
  converge,
  adjust,
  inc, //
  findIndex,
  equals,
  head,
  identity,
  zip,
  union,
  curry,
  reduce,
  flatten,
  apply,
  repeat,
  zipWith,
  min,
  max
} from 'ramda'

// -----------------

const toCounterPairs = map(compose(append(0), of))
const addToCounterPairs = (counters, value) => converge(adjust(adjust(inc, 1)), [findIndex(compose(equals(value), head)), identity])(counters)
const concatCounters = compose(adjust(head, 0), zip)

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

// -----------------

export {
  toCounterPairs,
  addToCounterPairs,
  concatCounters,
  setOperationWithRepeats,
  intersectionWithRepeats,
  unionWithRepeats
}
