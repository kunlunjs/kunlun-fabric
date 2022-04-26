import { resolve } from 'path'
import fs from 'fs-extra'
import emoji from 'node-emoji'
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

const eslint = isExist('stylelint', eslintConfig)
if (!eslint) {
  console.log(`${emoji.get(':white_check_mark:')} .eslintrc.js`)
  fs.writeFileSync(
    resolve(cwd, '.eslintrc.js'),
    `// @ts-check
/**
 * @type {import('eslint').Linter.Config}
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
  console.log(`${emoji.get(':white_check_mark:')} prettier.config.js`)
  fs.writeFileSync(
    resolve(cwd, 'prettier.config.js'),
    `// @ts-check
const prettierConfig = require('@kunlunjs/fabric/dist/prettier')

/**
 * 安装 @types/prettier，可选
 * @type {import('prettier').Config}
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
  console.log(`${emoji.get(':white_check_mark:')} stylelint.config.js`)
  fs.writeFileSync(
    resolve(cwd, 'stylelint.config.js'),
    `// @ts-check
/**
 * @type {import('stylelint').Config}
 */
module.exports = {
  extends: [require.resolve('@kunlunjs/fabric/dist/stylelint')]
}
`
  )
}
writeFile('.stylelintignore')
