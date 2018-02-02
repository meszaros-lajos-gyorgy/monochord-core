const Errors = Object.freeze({
  INVALID_NUMBER: 0x01,
  DIVISION_BY_ZERO: 0x02,
  INVALID_DECIMAL_PLACES: 0x03,
  INVALID_ROUNDING_MODE: 0x04,
  NEGATIVE_ROOT: 0x05
})

const RoundModes = {
  ROUND_UP: 0,
  ROUND_DOWN: 1,
  ROUND_CEIL: 2,
  ROUND_FLOOR: 3,
  ROUND_HALF_UP: 4,
  ROUND_HALF_DOWN: 5,
  ROUND_HALF_EVEN: 6,
  ROUND_HALF_CEIL: 7,
  ROUND_HALF_FLOOR: 8,
  EUCLID: 9
}

export {
  Errors,
  RoundModes
}
