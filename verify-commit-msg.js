// Invoked on the commit-msg git hook
const { readFileSync } = require('fs')

// process.argv: [node, verify-commit-msg.js, .git/COMMIT_EDITMSG]
const msgPath = process.argv[2]
const msg = readFileSync(msgPath, 'utf-8').trim()

const mergeReg = /^Merge branch/i
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
  'chore', // changes to the build process or auxiliary tools and libraries such as documentation generation
  'config', // changing configuration files
  'chore-deps', // add or delete dependencies
  'chore-release', // code deployment or publishing to external repositories
  'i18n', // internationalization and localization
  'style', // changes that do not affect the meaning of code (white-space, formatting, missing semi-colors, etc)
  'release', // code deployment or publishing to external repositories
  'breaking', // introducing breaking changes
  'refactor', // a code change that neither fixes a bug nor adds a feature
  'security' // fixing security issues
]
const commitRE = new RegExp(
  `^(revert: )?(${pre.join('|')})(\\(.+\\))?: .{1,50}`
)

if (!mergeReg.test(msg) && !releaseRE.test(msg) && !commitRE.test(msg)) {
  console.log()
  console.log()
  console.error(
    `  \x1b[41m\x1b[37m ERROR \x1b[0m
      \x1b[31minvalid commit message format.\x1b[0m
    \n\n` +
      `    \x1b[31mProper commit message format is required for automated changelog generation. Examples:\x1b[0m\n\n` +
      `    \x1b[32mfeat: add 'comments' option\x1b[0m\n` +
      `    \x1b[32mfix: handle events on blur (close #28)\x1b[0m\n\n` +
      `    \x1b[31mSee https://github.com/kunlunjs/kunlun-fabric/blob/main/verify-commit-msg.js for more details.\x1b[0m\n`
  )
  process.exit(1)
}
