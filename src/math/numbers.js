import {
  unless,
  curryN,
  apply,
  compose,
  find,
  pluck,
  converge,
  defaultTo,
  reduce
} from 'ramda'

import {
  Either
} from 'ramda-fantasy'

// TODO: add memoization

const getValues = pluck('value')
const getLeft = find(Either.isLeft)

const _apply = curryN(2, (fn, arr) => converge(defaultTo, [
  compose(
    apply(fn),
    getValues
  ),
  getLeft
])(arr))

const _reduce = curryN(3, (fn, initial, values) => unless(
  Either.isLeft,
  () => converge(defaultTo, [
    reduce(fn, initial), // nthArg(0) + nthArg(1)
    getLeft
  ])(values) // nthArg(2)
)(initial)) // nthArg(1)

export {
  getValues,
  getLeft,
  _apply as apply,
  _reduce as reduce
}
