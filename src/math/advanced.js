import {
  isZero,
  modulo
} from './basic'

import {
  reduce
} from 'ramda'

// -----------------

const findGreatestCommonDivisor = (a, b) => isZero(b) ? a : findGreatestCommonDivisor(b, modulo(a, b))
const findGreatestCommonDivisorArray = ([first, ...rest]) => reduce(findGreatestCommonDivisor, first, rest)

// -----------------

export {
  findGreatestCommonDivisor,
  findGreatestCommonDivisorArray
}
