const getType = x => typeof x
const getRandomBetween = (min, max) => Math.floor(Math.random() * max - min) + min

export {
  getType,
  getRandomBetween
}
