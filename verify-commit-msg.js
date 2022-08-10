// Invoked on the commit-msg git hook
const { readFileSync } = require('fs')
const chalk = require('chalk')

// process.argv: [ts-node, verify-commit-msg.ts, .git/COMMIT_EDITMSG]
const msgPath = process.argv[2]
const msg = readFileSync(msgPath, 'utf-8').trim()

const releaseRE = /^v\d/
const pre = [
  'add', // add something
  'remove', // remove something
  'ci', // updates to the continous integration system
  'fix', // a bug fix
  'feat', // a new feature
  'docs', // documentation only changes
  'perf', // a code change that improves performance
  'test', // adding missing or correcting existing tests
  'build', // changes related to build processes
  'config', // changing configuration files
  'chore', // changes to the build process or auxiliary tools and libraries such as documentation generation
  'chore-release', // code deployment or publishing to external repositories
  'chore-deps', // add or delete dependencies
  'i18n', // internationalization and localization
  'style', // changes that do not affect the meaning of code (white-space, formatting, missing semi-colors, etc)
  'breaking', // introducing breaking changes
  'release', // code deployment or publishing to external repositories
  'refactor', // a code change that neither fixes a bug nor adds a feature
  'security' // fixing security issues
]
const commitRE = new RegExp(
  `^(revert: )?(${pre.join('|')})(\\(.+\\))?: .{1,50}`
)

if (!releaseRE.test(msg) && !commitRE.test(msg)) {
  console.log()
  console.error(
    `  ${chalk.bgRed(chalk.white(' ERROR '))} ${chalk.red(
      `invalid commit message format.`
    )}\n\n` +
      chalk.red(
        `  Proper commit message format is required for automated changelog generation. Examples:\n\n`
      ) +
      `    ${chalk.green(`feat: add 'comments' option`)}\n` +
      `    ${chalk.green(`fix: handle events on blur (close #28)`)}\n\n` +
      chalk.red(
        `  See https://github.com/kunlunjs/kunlun-fabric/blob/main/src/verify-commit-msg.ts for more details.\n`
      )
  )
  process.exit(1)
}
