import { resolve } from 'path'
import chalk from 'chalk'
import fs from 'fs-extra'
import { isExist, writeFile } from './utils'

export const cwd = process.env.INIT_CWD || resolve('../../../..', __dirname)
export const pkg = require(resolve(cwd, 'package.json'))

// https://editorconfig.org/
writeFile('.editorconfig')

// https://eslint.org/docs/user-guide/configuring/configuration-files#configuration-file-formats
const eslintConfig = [
  '.eslintrc.js',
  '.eslintrc.cjs',
  '.eslintrc.yaml',
  '.eslintrc.yml',
  '.eslintrc.json'
]

const eslint = isExist('eslintConfig', eslintConfig)
if (!eslint) {
  console.log(chalk.green(`√ ${chalk.gray('.eslintrc.js')}`))
  fs.writeFileSync(
    resolve(cwd, '.eslintrc.js'),
    `// @ts-check
/**
 * @type {import('eslint').Linter.Config}
 * @see https://github.com/turing-fe/kunlun-fabric/blob/main/src/eslint.ts
 */
module.exports = {
  extends: [require.resolve('@kunlunjs/fabric/dist/eslint')]
}
`
  )
}
writeFile('.eslintignore')

// https://prettier.io/docs/en/configuration.html
const prettierConfig = [
  '.prettierrc',
  '.prettierrc.json',
  '.prettierrc.yml',
  '.prettierrc.js',
  '.prettierrc.cjs',
  'prettier.config.js',
  'prettier.config.cjs',
  '.prettierrc.toml'
]

const prettier = isExist('prettier', prettierConfig)
if (!prettier) {
  console.log(chalk.green(`√ ${chalk.gray('prettier.config.js')}`))
  fs.writeFileSync(
    resolve(cwd, 'prettier.config.js'),
    `// @ts-check
const prettierConfig = require('@kunlunjs/fabric/dist/prettier')

/**
 * @type {import('prettier').Config}
 * @see https://github.com/turing-fe/kunlun-fabric/blob/main/src/prettier.ts
 */
module.exports = {
  ...prettierConfig,
  // 如果使用了 tailwindcss，默认查找 prettier 配置文件同目录的 tailwindcss.config.js 文件，在其它位置则需指定，如
  // tailwindConfig: './packages/web/tailwind.config.js'
}
`
  )
}
writeFile('.prettierignore')

// https://stylelint.io/user-guide/configure
const stylelintConfig = [
  '.stylelintrc',
  'stylelint.config.js',
  'stylelint.config.cjs',
  '.stylelintrc.json',
  '.stylelintrc.yaml',
  '.stylelintrc.yml',
  '.stylelintrc.js'
]

const stylelint = isExist('stylelint', stylelintConfig)
if (!stylelint) {
  console.log(chalk.green(`√ ${chalk.gray('stylelint.config.js')}`))
  fs.writeFileSync(
    resolve(cwd, 'stylelint.config.js'),
    `// @ts-check
/**
 * @type {import('stylelint').Config}
 * @see https://github.com/turing-fe/kunlun-fabric/blob/main/src/stylelint.ts
 */
module.exports = {
  extends: [require.resolve('@kunlunjs/fabric/dist/stylelint')]
}
`
  )
}
writeFile('.stylelintignore')
