const { resolve } = require('path')

let cwd = process.env.INIT_CWD
// 在 node_modules/@kunlunjs/fabric/src 中
if (!cwd && process.cwd() === resolve(__dirname, '..')) {
  cwd = resolve(__dirname, '../../../..')
}
if (process.env.PWD.endsWith('@kunlunjs/fabric')) {
  cwd = resolve(__dirname, '../../..')
}
// 在 kunlun-fabric 中
if (!cwd && process.cwd() === __dirname) {
  cwd = process.cwd()
}
if (!cwd) {
  cwd = process.cwd()
}

const pkg = require(resolve(cwd, 'package.json'))

exports.cwd = cwd
exports.pkg = pkg
