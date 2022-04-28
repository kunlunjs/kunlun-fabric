import { resolve } from 'path'

let cwd = process.env.INIT_CWD || resolve('../../../..', __dirname)
if (cwd === __dirname) {
  cwd = process.cwd()
}
export { cwd }
export const pkg = require(resolve(cwd, 'package.json'))
