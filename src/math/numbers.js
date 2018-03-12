import {
  when,
  unless,
  curryN,
  apply,
  map,
  compose,
  all,
  find,
  pluck,
  converge,
  defaultTo,
  prop,
  of,
  flatten,
  nthArg,
  ifElse,
  concat,
  uniqBy,
  toString,
  reduce
} from 'ramda'

import {
  Either
} from 'ramda-fantasy'

// TODO: add memoization

const isValid = all(Either.isRight)
const isValidDeep = compose(isValid, flatten)
const getValues = pluck('value')
const getLeft = find(Either.isLeft)

const _apply = curryN(2, (fn, arr) => converge(defaultTo, [
  compose(
    apply(fn),
    getValues
  ),
  getLeft
])(arr))

const _map = curryN(2, (fn, arr) => when(
  isValid,
  map(fn)
)(arr))

const flatMap = curryN(2, (fn, arr) => when(
  isValid,
  map(compose(
    apply(fn),
    of,
    prop('value')
  ))
)(arr))

const uniq = when(
  isValid,
  uniqBy(compose(toString, prop('value')))
)

const union = ifElse(
  compose(isValid, nthArg(0)),
  ifElse(
    compose(isValid, nthArg(1)),
    compose(
      uniq,
      concat
    ),
    nthArg(1)
  ),
  nthArg(0)
)

const _reduce = curryN(3, (fn, initial, values) => unless(
  Either.isLeft,
  () => converge(defaultTo, [
    reduce(fn, initial), // nthArg(0) + nthArg(1)
    getLeft
  ])(values) // nthArg(2)
)(initial)) // nthArg(1)

const flatReduce = curryN(3, (fn, initial, values) => unless(
  Either.isLeft,
  () => converge(defaultTo, [
    reduce((acc, curr) => fn(acc, prop('value')(curr)), initial), // nthArg(0) + nthArg(1)
    getLeft
  ])(values) // nthArg(2)
)(initial)) // nthArg(1)

const _find = curryN(2, (fn, arr) => when(
  isValid,
  () => {
    let idx = 0
    const len = arr.length
    while (idx < len) {
      const checkResult = fn(arr[idx])
      if (Either.isRight(checkResult) && checkResult.value === true) {
        return arr[idx]
      }
      idx += 1
    }
    return Either.Right(null)
  }
)(arr))

export {
  isValid,
  isValidDeep,
  getValues,
  getLeft,
  _apply as apply,
  _map as map,
  flatMap,
  uniq,
  union,
  _reduce as reduce,
  flatReduce,
  _find as find
}
