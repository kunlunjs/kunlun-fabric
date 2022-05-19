const { resolve } = require('path')
const { existsSync } = require('fs-extra')

let cwd = process.env.INIT_CWD || resolve('../../../..', __dirname)
if (cwd === __dirname) {
  cwd = process.cwd()
}
const generate = resolve(__dirname, '../dist/generator.js')
if (!cwd.endsWith('/kunlun-fabric') && existsSync(generate)) {
  // @ts-ignore
  require(generate)
}
