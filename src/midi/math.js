import {
  memoize,
  clamp,
  curryN,
  add,
  __,
  compose,
  subtract,
  multiply,
  divide
} from 'ramda'

import {
  keyIdMin,
  keyIdMax,
  referenceNote,
  octaveRatio,
  semitonesPerOctave,
  pitchBendMax,
  maxBendingDistanceInSemitones
} from './constants'

const logX = curryN(2, memoize((base, n) => divide(Math.log(n), Math.log(base))))

const moveNUnits = curryN(4, memoize((ratioOfSymmetry, divisionsPerRatio, n, frequency) => multiply(frequency, Math.pow(ratioOfSymmetry, divide(n, divisionsPerRatio)))))
const getDistanceInUnits = curryN(4, memoize((ratioOfSymmetry, divisionsPerRatio, frequency2, frequency1) => multiply(divisionsPerRatio, logX(ratioOfSymmetry, divide(frequency2, frequency1)))))

const moveNSemitones = moveNUnits(octaveRatio, semitonesPerOctave)
const getDistanceInSemitones = getDistanceInUnits(octaveRatio, semitonesPerOctave)

const bendingRatio = moveNSemitones(maxBendingDistanceInSemitones, 1)

const bendNUnits = moveNUnits(bendingRatio, pitchBendMax)
const getBendingDistance = getDistanceInUnits(bendingRatio, pitchBendMax)

const getNoteFrequency = memoize(compose(
  moveNSemitones(__, referenceNote.frequency),
  subtract(__, referenceNote.id),
  clamp(keyIdMin, keyIdMax)
))

const getNoteId = memoize(compose(
  Math.floor,
  add(__, referenceNote.id),
  getDistanceInSemitones(__, referenceNote.frequency)
))

export {
  logX,
  moveNUnits,
  getDistanceInUnits,
  moveNSemitones,
  getDistanceInSemitones,
  bendNUnits,
  getBendingDistance,
  getNoteFrequency,
  getNoteId
}
