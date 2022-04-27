import { resolve } from 'path'
import { generateConfig, ignores, writeFile } from './utils'

ignores.forEach(writeFile)

generateConfig('.eslintrc.js', {
  packageKey: 'eslintConfig',
  filePath: resolve(__dirname, '../generate/eslintrc')
})
generateConfig('prettier.config.js', {
  packageKey: 'prettier',
  filePath: resolve(__dirname, '../generate/prettier')
})
generateConfig('stylelint.config.js', {
  packageKey: 'stylelint',
  filePath: resolve(__dirname, '../generate/stylelint')
})
generateConfig('commit-msg', {
  filePath: resolve(__dirname, '../.husky/commit-msg')
})
generateConfig('pre-commit', {
  filePath: resolve(__dirname, '../.husky/pre-commit')
})
generateConfig('prepare-commit-msg', {
  filePath: resolve(__dirname, '../.husky/prepare-commit-msg')
})
generateConfig('lint-staged.config.js', {
  packageKey: 'lint-staged',
  filePath: resolve(__dirname, '../lint-staged.config.js')
})
generateConfig('verify-commit-msg.js', {
  filePath: resolve(__dirname, '../dist/verify-commit-msg.js')
})
