const {
  concat,
  curry,
  curryN
} = require('ramda')

const {
  commands,
  cc,
  pitchBendMin
} = require('./constants')

// -----------------

const setPitchBendLimit = curry((channel, semitones) => {
  return [
    commands.cc << 4 | channel - 1, cc.registeredParameterLSB, 0,
    commands.cc << 4 | channel - 1, cc.registeredParameterMSB, 0,
    commands.cc << 4 | channel - 1, cc.dataEntry, semitones,
    commands.cc << 4 | channel - 1, cc.registeredParameterLSB, 127,
    commands.cc << 4 | channel - 1, cc.registeredParameterMSB, 127
  ]
})

const pitchBendAmountToDataBytes = pitchBendAmount => {
  const realValue = pitchBendAmount - pitchBendMin
  return [realValue & 0b01111111, (realValue >> 7) & 0b01111111]
}

const bendPitch = curry((channel, pitchBendAmount) => {
  return concat([commands.pitchbend << 4 | channel - 1], pitchBendAmountToDataBytes(pitchBendAmount))
})

const noteOn = curryN(2, (channel, note, pitchBendAmount = null, velocity = 127) => {
  return concat(
    pitchBendAmount !== null ? bendPitch(channel, pitchBendAmount) : [],
    [commands.noteOn << 4 | channel - 1, note, velocity]
  )
})

const noteOff = curryN(2, (channel, note, velocity = 127) => {
  return [commands.noteOff << 4 | channel - 1, note, velocity]
})

// -----------------

module.exports = {
  setPitchBendLimit,
  pitchBendAmountToDataBytes,
  bendPitch,
  noteOn,
  noteOff
}
