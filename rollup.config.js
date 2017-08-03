import uglify from 'rollup-plugin-uglify'
import buble from 'rollup-plugin-buble'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import ramda from 'rollup-plugin-ramda'
import multiEntry from 'rollup-plugin-multi-entry'

const {
  name,
  author,
  license
} = require('./package.json')

const lPadZero = num => (num < 10 ? '0' : '') + num

const getDate = () => {
  const d = new Date()
  const year = d.getFullYear()
  const month = lPadZero(d.getMonth() + 1)
  const day = lPadZero(d.getDate())
  return `${year}-${month}-${day}`
}

const isWatching = process.env.ROLLUP_WATCH
const banner = `// ${name} - created by ${author} - ${license} licence - last built on ${getDate()}`

export default [{
  banner: banner,
  entry: [
    'src/index.js'
  ].concat(isWatching ? 'src/load-reload.js': []),
  dest: 'dist/monochord-core.js',
  format: 'umd',
  moduleName: 'MonochordCore',
  sourceMap: false,
  plugins: [
    multiEntry(),
    resolve({
      jsnext: true,
      main: true
    }),
    commonjs({
      namedExports : {
        'node_modules/ramda/index.js': Object.keys(require('ramda'))
      }
    }),
    ramda(),
    buble()
  ]
}, {
  entry: [
    'src/index.js'
  ].concat(isWatching ? 'src/load-reload.js': []),
  dest: 'dist/monochord-core.min.js',
  format: 'umd',
  moduleName: 'MonochordCore',
  sourceMap: true,
  plugins: [
    multiEntry(),
    resolve({
      jsnext: true,
      main: true
    }),
    commonjs({
      namedExports : {
        'node_modules/ramda/index.js': Object.keys(require('ramda'))
      }
    }),
    ramda(),
    buble(),
    uglify({
      output: {
        preamble: banner
      }
    })
  ]
}]
