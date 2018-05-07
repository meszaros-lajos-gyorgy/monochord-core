# monochord-core

A low-level microtonal synth API

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=PXF8ZVL3KPQWE)
[![Build Status](https://travis-ci.org/meszaros-lajos-gyorgy/monochord-core.svg?branch=master)](https://travis-ci.org/meszaros-lajos-gyorgy/monochord-core)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## What is this

The Monochord-Core library is aiming to ease mathematical calculations for musical apps, plus also add the necessary mathematical precision, that javascript lacks. The library is influenced by functional programming libraries and every function carries some beneficial properties because of it.

The library is using the [Ramda](http://ramdajs.com/) for the necessary functional background, and [Decimal.js](https://github.com/MikeMcl/decimal.js/) for proper mathematical calculations.

## Parts of the library

The library does not use classes, but provide a well organized set of functions. The functions were groupped into the following categories:

### Math

This is the base of the whole library, this provides all the mathematical functions for the rest of the library. The rest of the library is using these functions, instead of the vanilla javascript operations.

### Midi

Contains some helper functions to work with raw midi data, plus some constants for easier data management.

### Convert

These set of functions allow conversion between musical units, for example cents and ratios.

### Scala

These functions are designed to help parsing and creating scala .scl formatted files.

## License

MIT
