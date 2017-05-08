import uglify from 'rollup-plugin-uglify'
import buble from 'rollup-plugin-buble'

export default [{
  entry: 'src/index.js',
  dest: 'dist/monochord-core.js',
  format: 'umd',
  moduleName: 'MonochordCore',
  plugins: [
    buble()
  ]
}, {
  entry: 'src/index.js',
  dest: 'dist/monochord-core.min.js',
  format: 'umd',
  moduleName: 'MonochordCore',
  sourceMap: true,
  plugins: [
    buble(),
    uglify()
  ]
}]
