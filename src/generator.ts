import { resolve } from 'path'
import fs from 'fs-extra'
import emoji from 'node-emoji'

const pkg = require(resolve(process.cwd(), 'package.json'))

// https://eslint.org/docs/user-guide/configuring/configuration-files#configuration-file-formats
const eslintConfig = [
  '.eslintrc.js',
  '.eslintrc.cjs',
  '.eslintrc.yaml',
  '.eslintrc.yml',
  '.eslintrc.json'
]

let eslint = false
if (pkg.eslintConfig) {
  eslint = true
} else {
  for (const e of eslintConfig) {
    if (fs.pathExistsSync(resolve(process.cwd(), e))) {
      eslint = true
    }
  }
}
if (!eslint) {
  console.log(
    `${emoji.get(':white_check_mark:')} automatic generation .eslintrc.js`
  )
  fs.writeFileSync(
    resolve(process.cwd(), '.eslintrc.js'),
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

let prettier = false
if (pkg.prettier) {
  prettier = true
} else {
  for (const p of prettierConfig) {
    if (fs.pathExistsSync(resolve(process.cwd(), p))) {
      prettier = true
    }
  }
}

if (!prettier) {
  console.log(
    `${emoji.get(':white_check_mark:')} automatic generation prettier.config.js`
  )
  fs.writeFileSync(
    resolve(process.cwd(), 'prettier.config.js'),
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
let stylelint = false
if (pkg.stylelint) {
  stylelint = true
} else {
  for (const p of stylelintConfig) {
    if (fs.pathExistsSync(resolve(process.cwd(), p))) {
      stylelint = true
    }
  }
}

if (!stylelint) {
  console.log(
    `${emoji.get(
      ':white_check_mark:'
    )} automatic generation stylelint.config.js`
  )
  fs.writeFileSync(
    resolve(process.cwd(), 'stylelint.config.js'),
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
