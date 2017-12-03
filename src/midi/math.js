import {
  memoize,
  clamp,
  curryN,
  __,
  compose
} from 'ramda'

import {
  add,
  subtract,
  multiply,
  divide,
  logX,
  floor,
  pow
} from '../math/index'

import {
  keyIdMin,
  keyIdMax,
  referenceNote,
  octaveRatio,
  semitonesPerOctave,
  pitchBendMax,
  maxBendingDistanceInSemitones
} from './constants'

// -----------------

const moveNUnits = curryN(4, memoize((ratioOfSymmetry, divisionsPerRatio, n, frequency) => compose(
  multiply(frequency),
  pow(ratioOfSymmetry),
  divide(n)
)(divisionsPerRatio)))

const getDistanceInUnits = curryN(4, memoize((ratioOfSymmetry, divisionsPerRatio, frequency2, frequency1) => compose(
  multiply(divisionsPerRatio),
  logX(ratioOfSymmetry),
  divide(frequency2)
)(frequency1)))

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
  floor,
  add(__, referenceNote.id),
  getDistanceInSemitones(__, referenceNote.frequency)
))

// -----------------

export {
  moveNUnits,
  getDistanceInUnits,
  moveNSemitones,
  getDistanceInSemitones,
  bendNUnits,
  getBendingDistance,
  getNoteFrequency,
  getNoteId
}
