import { exec, execSync } from 'child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import os from 'os'
import { resolve } from 'path'

// https://raw.githubusercontent.com/omnidan/node-emoji/master/lib/emoji.json
// import emoji from 'node-emoji'
import { configFiles } from './configs'
import { cwd, pkg } from './root'

const isWin32 = os.platform() === 'win32'

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

export function writeFile(file: (typeof ignores)[number]) {
  const editorconfig = resolve(cwd, file)
  if (!existsSync(editorconfig)) {
    console.log(`\x1b[32m√ \x1b[90m${file}\x1b[0m`)
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
    | 'settings.json'
    | '.npmrc',
  {
    packageFieldName,
    contentFile,
    exclude,
    output
  }: {
    /**
     * package.json field name
     */
    packageFieldName?: packageFieldName
    /**
     * File content
     */
    contentFile?: string
    /**
     * Content that needs to be excluded
     */
    exclude?: string[]
    /**
     * Output directory
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
    // Confirm that the folder already exists or create a new one.
    if (output.match(/\//)) {
      const dir = output.match(/(.*\/)[\w\-.]+$/)[1]
      const dirname = resolve(cwd, dir)
      if (!existsSync(dirname)) {
        mkdirSync(dirname, {
          recursive: true
        })
      }
    }
    console.log(`\x1b[32m√ \x1b[90m${output}\x1b[0m`)
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

export function cmdExist(cmd: 'yarn' | 'pnpm') {
  try {
    execSync(
      isWin32
        ? `cmd /c "(help ${cmd} > nul || exit 0) && where ${cmd} > nul 2> nul"`
        : `command -v ${cmd}`
    )
    return true
  } catch {
    return false
  }
}
