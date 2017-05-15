import uglify from 'rollup-plugin-uglify'
import buble from 'rollup-plugin-buble'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import ramda from 'rollup-plugin-ramda'

export default [{
  entry: 'src/index.js',
  dest: 'dist/monochord-core.js',
  format: 'umd',
  moduleName: 'MonochordCore',
  sourceMap: true,
  plugins: [
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
    uglify()
  ]
}]
