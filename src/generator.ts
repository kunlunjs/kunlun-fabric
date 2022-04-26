import { resolve } from 'path'
import fs from 'fs-extra'
import emoji from 'node-emoji'

const cwd = process.env.INIT_CWD || resolve('../../../..', __dirname)
console.log('cwd: ', cwd)
const pkg = require(resolve(cwd, 'package.json'))

// https://editorconfig.org/
const editorconfig = resolve(cwd, '.editorconfig')
if (!fs.pathExistsSync(editorconfig)) {
  console.log(`${emoji.get(':white_check_mark:')} .editorconfig`)
  fs.writeFileSync(editorconfig, fs.readFileSync(editorconfig))
}

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
    if (fs.pathExistsSync(resolve(cwd, e))) {
      eslint = true
    }
  }
}
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
const eslintIgnore = resolve(cwd, '.eslintIgnore')
if (!fs.pathExistsSync(eslintIgnore)) {
  console.log(`${emoji.get(':white_check_mark:')} .eslintignore`)
  fs.writeFileSync(
    eslintIgnore,
    `
.gitignore
.husky
.DS_Store
.gitignore
.editorconfig
.eslintignore
.prettierignore
.stylelintignore
*.lock
*.yml
*.yaml
LICENSE
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
    if (fs.pathExistsSync(resolve(cwd, p))) {
      prettier = true
    }
  }
}

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
const prettierIgnore = resolve(cwd, '.prettierignore')
if (!fs.pathExistsSync(prettierIgnore)) {
  console.log(`${emoji.get(':white_check_mark:')} .prettierignore`)
  fs.writeFileSync(
    prettierIgnore,
    `
.gitignore
.husky
.DS_Store
.gitignore
.editorconfig
.eslintignore
.prettierignore
.stylelintignore
*.lock
*.yml
*.yaml
LICENSE
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
    if (fs.pathExistsSync(resolve(cwd, p))) {
      stylelint = true
    }
  }
}

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
const stylelintIgnore = resolve(cwd, '.stylelintignore')
if (!fs.pathExistsSync(stylelintIgnore)) {
  console.log(`${emoji.get(':white_check_mark:')} .stylelintignore`)
  fs.writeFileSync(
    stylelintIgnore,
    `
**/*.js
**/*.ts
**/*.yml
**/*.yaml
**/*.lock
**/*.prisma
**/*.graphql
`
  )
}
