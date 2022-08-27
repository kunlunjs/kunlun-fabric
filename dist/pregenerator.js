var cwd = require('./root').cwd;
// const chalk = require('chalk')
// console.log(chalk.gray(`$PWD: ${cwd}`))
if (!cwd.endsWith('/kunlun-fabric')) {
    // @ts-ignore
    require('./generator');
}
