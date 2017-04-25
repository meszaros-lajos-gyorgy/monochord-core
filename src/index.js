import {

} from './math'

class MonochordCore {
  constructor () {
    this.baseVolume = 0
    this.baseFrequency = 440
  }

  setBaseFrequency (newFrequency, keyNote) {
    this.baseFrequency = newFrequency
  }
}

const monochordCore = new MonochordCore()

export default monochordCore
