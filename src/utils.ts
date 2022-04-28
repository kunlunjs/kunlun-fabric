import { exec } from 'child_process'
import { resolve } from 'path'
import chalk from 'chalk'
import { existsSync, writeFileSync, readFileSync, mkdirpSync } from 'fs-extra'
// https://raw.githubusercontent.com/omnidan/node-emoji/master/lib/emoji.json
// ${emoji.get(':white_check_mark:')}
// import emoji from 'node-emoji'
import { configFiles } from './configs'

export let cwd = process.env.INIT_CWD || resolve('../../../..', __dirname)
if (cwd === __dirname) {
  cwd = process.cwd()
}
export const pkg = require(resolve(cwd, 'package.json'))

type packageFieldName = keyof typeof configFiles

export function isExist(
  config: string[],
  packageFieldName?: packageFieldName,
  filePath?: string
): boolean {
  let flag = false
  if (config.length === 0 && !packageFieldName && filePath) {
    flag = existsSync(resolve(cwd, filePath))
  }
  if (packageFieldName && pkg[packageFieldName]) {
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

export function generateFile(
  filename:
    | 'commit-msg'
    | 'pre-commit'
    | 'prepare-commit-msg'
    | 'lint-staged.config.js'
    | 'verify-commit-msg.js'
    | '.eslintrc.js'
    | 'prettier.config.js'
    | 'stylelint.config.js'
    | 'extensions.json'
    | 'launch.json'
    | 'settings.json',
  {
    packageFieldName,
    contentFile,
    exclude,
    output
  }: {
    /**
     * 在 package.json 中的 name
     */
    packageFieldName?: packageFieldName
    /**
     * 内容
     */
    contentFile?: string
    /**
     * 需要排除的内容
     */
    exclude?: string[]
    /**
     * 输出目录
     */
    output?: string
  }
) {
  output = output || filename
  const isExistFile = isExist(
    packageFieldName ? configFiles[packageFieldName] : [],
    packageFieldName,
    output
  )
  if (!isExistFile) {
    // 判断是否包含目录及确认目录已建
    if (output.match(/\//)) {
      const dir = output.match(/(.*\/)[\w-.]+$/)[1]
      const dirname = resolve(cwd, dir)
      if (!existsSync(dirname)) {
        mkdirpSync(dirname)
      }
    }
    console.log(chalk.green(`√ ${chalk.gray(filename)}`))
    let content = readFileSync(resolve(__dirname, contentFile)).toString()
    if (exclude) {
      content = content
        .split('\n')
        .filter(i => !i.trim().match(new RegExp(`^(${exclude.join('|')})$`)))
        .join('\n')
    }
    writeFileSync(resolve(cwd, output), content)
  }
}

export function execPromise(cmd: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        reject(err)
      } else {
        resolve(stdout)
      }
    })
  })
}
