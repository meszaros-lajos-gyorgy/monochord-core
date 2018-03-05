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
  flatten,
  nthArg,
  ifElse,
  concat,
  uniqBy,
  toString
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

export {
  isValid,
  isValidDeep,
  getValues,
  getLeft,
  _apply as apply,
  _map as map,
  flatMap,
  uniq,
  union
}
