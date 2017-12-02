const {
  __,
  reject,
  contains,
  unless,
  of
} = require('ramda')

// -----------------

const iteratorToArray = iterator => {
  const values = []

  for (let item = iterator.next(); item && !item.done; item = iterator.next()) {
    values.push(item.value)
  }

  return values
}

const subtractValuesFrom = (toRemove, from) => reject(contains(__, toRemove), from)

const wrapInArrayIfNeeded = unless(Array.isArray, of)

// -----------------

module.exports = {
  iteratorToArray,
  subtractValuesFrom,
  wrapInArrayIfNeeded
}
