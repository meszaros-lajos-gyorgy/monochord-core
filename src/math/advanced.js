import {
  isZero,
  modulo
} from './basic'

// -----------------

const findGreatestCommonDivisor = (a, b) => isZero(b) ? a : findGreatestCommonDivisor(b, modulo(a, b))

// -----------------

export {
  findGreatestCommonDivisor
}
