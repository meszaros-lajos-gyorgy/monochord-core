/*
import {
  curry,
  keys,
  map,
  forEach,
  assoc,
  __
} from 'ramda'

import {
  iteratorToArray,
  subtractValuesFrom
} from '../helpers'

import {
  defaultInputData,
  defaultOutputData
} from './constants'

// -----------------

const getNameFromPort = port => `${port.name} (version ${port.version}) ${port.manufacturer}`

const updatePorts = (ports, type, devices, onMidiMessage) => {
  const namesOfOldPorts = keys(devices[type + 's'])
  const namesOfNewPorts = map(updatePort(__, devices, onMidiMessage), iteratorToArray(ports.values()))

  forEach(name => {
    delete devices[type + 's'][name]
  }, subtractValuesFrom(namesOfNewPorts, namesOfOldPorts))
}

const updatePort = curry((port, devices, onMidiMessage) => {
  const name = getNameFromPort(port)
  const device = devices[port.type + 's'][name] || assoc('port', port, port.type === 'input' ? defaultInputData : defaultOutputData)

  device.connected = false

  if (port.state === 'connected') {
    if (port.connection === 'closed') {
      port.open()
    } else if (port.connection === 'open') {
      if (port.type === 'input') {
        port.onmidimessage = onMidiMessage(device)
      }
      device.connected = true
    }
  }

  devices[port.type + 's'][name] = device

  return name
})

// -----------------

export {
  getNameFromPort,
  updatePorts,
  updatePort
}
*/
