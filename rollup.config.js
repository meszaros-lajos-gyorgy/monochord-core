import uglify from 'rollup-plugin-uglify'
import buble from 'rollup-plugin-buble'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import ramda from 'rollup-plugin-ramda'
import fs from 'fs'

const getDate = () => {
  const d = new Date()
  const year = d.getFullYear()
  const month = (d.getMonth() + 1 < 10 ? '0' : '') + (d.getMonth() + 1)
  const day = (d.getDate() < 10 ? '0' : '') + d.getDate()
  return `${year}-${month}-${day}`
}

const config = JSON.parse(fs.readFileSync('package.json'))

const banner = `// ${config.name} - created by ${config.author} - ${config.license} licence - last built on ${getDate()}`

export default [{
  banner: banner,
  entry: 'src/index.js',
  dest: 'dist/monochord-core.js',
  format: 'umd',
  moduleName: 'MonochordCore',
  sourceMap: false,
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
    buble()
  ]
}, {
  entry: 'src/index.js',
  dest: 'dist/monochord-core.min.js',
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
    uglify({
			output: {
				preamble: banner
			}
		})
  ]
}]
