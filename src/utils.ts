import { resolve } from 'path'
import chalk from 'chalk'
import { existsSync, writeFileSync, readFileSync } from 'fs-extra'
// https://raw.githubusercontent.com/omnidan/node-emoji/master/lib/emoji.json
// ${emoji.get(':white_check_mark:')}
// import emoji from 'node-emoji'
import * as configs from './configs'

export const cwd = process.env.INIT_CWD || resolve('../../../..', __dirname)
export const pkg = require(resolve(cwd, 'package.json'))

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
  const isExistEslint = isExist(configs[packageKey], packageKey)
  if (!isExistEslint) {
    console.log(chalk.green(`√ ${chalk.gray(file)}`))
    writeFileSync(
      resolve(cwd, file),
      readFileSync(resolve(__dirname, filePath || `../generate/${file}`))
    )
  }
}
