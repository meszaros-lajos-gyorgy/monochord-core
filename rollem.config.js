import fs from 'fs'
import uglify from 'rollup-plugin-uglify'
import buble from 'rollup-plugin-buble'

const getVersionPostfix = () => {
  let version = ''

  try {
    const config = JSON.parse(fs.readFileSync('./package.json', 'utf8'))
    version = config.version
  } catch (e) {}

  return (version ? '-' + version : '')
}

export default [{
  entry: 'src/index.js',
  dest: 'dist/monochord-core' + getVersionPostfix() + '.js',
  format: 'umd',
  moduleName: 'MonochordCore',
  plugins: [
    buble()
  ]
}, {
  entry: 'src/index.js',
  dest: 'dist/monochord-core' + getVersionPostfix() + '.min.js',
  format: 'umd',
  moduleName: 'MonochordCore',
  sourceMap: true,
  plugins: [
    buble(),
    uglify()
  ]
}]
