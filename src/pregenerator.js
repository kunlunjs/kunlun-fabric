const { resolve } = require('path')
const { existsSync, realpathSync } = require('fs-extra')

const cwd = realpathSync(process.cwd())
console.log(
  'process.cwd(): ',
  cwd,
  existsSync(resolve(__dirname, '../dist/generator.js'))
)
if (
  !cwd.endsWith('/kunlun-fabric') &&
  existsSync(resolve(__dirname, '../dist/generator.js'))
) {
  // @ts-ignore
  require('../dist/generator.js')
}
