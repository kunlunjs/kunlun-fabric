import { mkdirSync } from 'fs'
import { resolve } from 'path'
import chalk from 'chalk'
import { existsSync, writeFileSync, readFileSync } from 'fs-extra'
// https://raw.githubusercontent.com/omnidan/node-emoji/master/lib/emoji.json
// ${emoji.get(':white_check_mark:')}
// import emoji from 'node-emoji'
import { configs } from './configs'

let cwd = process.env.INIT_CWD || resolve('../../../..', __dirname)
if (cwd === __dirname) {
  cwd = process.cwd()
}
const pkg = require(resolve(cwd, 'package.json'))

type PackageConfigName = keyof typeof configs

export function isExist(
  config: string[],
  packageKey?: PackageConfigName
): boolean {
  let flag = false
  if (packageKey && pkg[packageKey]) {
    flag = true
  } else {
    for (const s of config) {
      if (existsSync(resolve(cwd, s))) {
        flag = true
        break
      }
    }
  }
  return flag
}

export const ignores = [
  // https://editorconfig.org/
  '.editorconfig',
  '.eslintignore',
  '.prettierignore',
  '.stylelintignore'
] as const

export function writeFile(file: typeof ignores[number]) {
  const editorconfig = resolve(cwd, file)
  if (!existsSync(editorconfig)) {
    console.log(chalk.green(`√ ${chalk.gray(file)}`))
    writeFileSync(editorconfig, readFileSync(resolve(__dirname, `../${file}`)))
  }
}

export function generateConfig(
  file:
    | 'commit-msg'
    | 'pre-commit'
    | 'prepare-commit-msg'
    | 'lint-staged.config.js'
    | 'verify-commit-msg.js'
    | '.eslintrc.js'
    | 'prettier.config.js'
    | 'stylelint.config.js',
  {
    packageKey,
    filePath
  }: {
    packageKey?: PackageConfigName
    filePath?: string
  }
) {
  if (packageKey) {
    const isExistEslint = isExist(configs[packageKey], packageKey)
    if (!isExistEslint) {
      console.log(chalk.green(`√ ${chalk.gray(file)}`))
      writeFileSync(
        resolve(cwd, file),
        readFileSync(resolve(__dirname, filePath))
      )
    }
  } else if (filePath?.match(/\.husky/)) {
    const dir = resolve(cwd, '.husky')
    const fileName = `.husky${filePath.match(/\/([\w-]+)$/)[0]}`
    const dest = resolve(cwd, fileName)
    if (!existsSync(dest)) {
      if (!existsSync(dir)) {
        mkdirSync(dir)
      }
      console.log(chalk.green(`√ ${chalk.gray(fileName)}`))
      writeFileSync(dest, readFileSync(resolve(__dirname, filePath)))
    }
  } else if (filePath?.match(/verify-commit-msg/)) {
    const dest = resolve(cwd, `verify-commit-msg.js`)
    console.log(chalk.green(`√ ${chalk.gray('verify-commit-msg.js')}`))
    writeFileSync(dest, readFileSync(filePath))
  }
}
