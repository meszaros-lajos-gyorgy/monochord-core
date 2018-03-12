import {
  compose,
  converge,
  nthArg,
  unless,
  flip,
  curryN,
  always,
  when,
  repeat,
  __,
  adjust,
  map,
  flatten,
  of,
  concat
} from 'ramda'

import {
  Either
} from 'ramda-fantasy'

import {
  intersectionWithRepeats,
  topWithRepeats
} from './sets'

import {
  number,
  ifThenElse,
  unfold
} from './helpers'

import * as numbers from './numbers'

import {
  product,
  isInteger,
  isZero,
  equals,
  modulo,
  add,
  lte,
  sqrt,
  isNegative,
  negate,
  divide
} from './basic'

import {
  Errors
} from './constants'

// -----------------

const isDivisableBy = curryN(2, ifThenElse(
  compose(Either.Right, Either.isRight, nthArg(0)),
  ifThenElse(
    compose(Either.Right, Either.isRight, nthArg(1)),
    compose(isZero, flip(modulo)),
    nthArg(1)
  ),
  nthArg(0)
))

const step30 = curryN(2, ifThenElse(
  compose(Either.Right, Either.isRight, nthArg(0)),
  ifThenElse(
    compose(Either.Right, Either.isRight, nthArg(1)),
    ifThenElse(
      lte,
      always(Either.Right(false)),
      compose(
        adjust(add(30), 1),
        repeat(__, 2),
        nthArg(1)
      )
    ),
    nthArg(1)
  ),
  nthArg(0)
))

const smallestFactor = when(
  Either.isRight,
  ifThenElse(
    isInteger,
    ifThenElse(
      isZero,
      always(number(0)),
      ifThenElse(
        equals(1),
        always(number(1)),
        ifThenElse(
          isDivisableBy(number(2)),
          always(number(2)),
          ifThenElse(
            isDivisableBy(number(3)),
            always(number(3)),
            ifThenElse(
              isDivisableBy(number(5)),
              always(number(5)),

              n => {
                const val = numbers.find(
                  isDivisableBy(__, n),
                  flatten(numbers.map(
                    compose(map(__, [0, 4, 6, 10, 12, 16, 22, 24]), add),
                    unfold(step30(sqrt(n)), 7)
                  ))
                )

                return val.value === null ? n : val
              }
            )
          )
        )
      )
    ),
    always(Either.Left(Errors.INTEGER_REQUIRED))
  )
)

const getPrimeFactors = unless(
  Either.isLeft,
  ifThenElse(
    isInteger,
    ifThenElse(
      isZero,
      always([]),
      ifThenElse(
        isNegative,
        n => adjust(negate, 0, getPrimeFactors(negate(n))),
        n => compose(
          ifThenElse(
            equals(n),
            of,
            converge(concat, [
              of,
              compose(getPrimeFactors, divide(n))
            ])
          ),
          smallestFactor
        )(n)
      )
    ),
    always(Either.Left(Errors.INTEGER_REQUIRED))
  )
)

const findGreatestCommonDivisor = compose(
  product,
  converge(intersectionWithRepeats, [
    compose(getPrimeFactors, nthArg(0)),
    compose(getPrimeFactors, nthArg(1))
  ])
)

const findLeastCommonMultiple = compose(
  product,
  converge(topWithRepeats, [
    compose(getPrimeFactors, nthArg(0)),
    compose(getPrimeFactors, nthArg(1))
  ])
)

// -----------------

export {
  isDivisableBy,
  step30,
  smallestFactor,
  getPrimeFactors,
  findGreatestCommonDivisor,
  findLeastCommonMultiple
}
