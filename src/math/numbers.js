import {
  when,
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
  flatten
} from 'ramda'

import {
  Either
} from 'ramda-fantasy'

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

export {
  isValid,
  isValidDeep,
  getValues,
  getLeft,
  _apply as apply,
  _map as map,
  flatMap
}
