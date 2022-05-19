const { cwd } = require('./root')
const chalk = require('chalk')

console.log(chalk.gray(`$PWD: ${cwd}`))
if (!cwd.endsWith('/kunlun-fabric')) {
  // @ts-ignore
  require('./generator')
}
