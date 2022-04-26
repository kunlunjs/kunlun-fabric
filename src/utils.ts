import { resolve } from 'path'
import chalk from 'chalk'
import fs from 'fs-extra'
// https://raw.githubusercontent.com/omnidan/node-emoji/master/lib/emoji.json
// ${emoji.get(':white_check_mark:')}
// import emoji from 'node-emoji'
import { cwd, pkg } from './generator'

export function isExist(
  key: 'eslintConfig' | 'prettier' | 'stylelint',
  config: string[]
): boolean {
  let flag = false
  if (pkg[key]) {
    flag = true
  } else {
    for (const s of config) {
      if (fs.existsSync(resolve(cwd, s))) {
        flag = true
        break
      }
    }
  }
  return flag
}

export function writeFile(
  file:
    | '.editorconfig'
    | '.eslintignore'
    | '.prettierignore'
    | '.stylelintignore'
) {
  const editorconfig = resolve(cwd, file)
  if (!fs.existsSync(editorconfig)) {
    console.log(chalk.green(`√ ${chalk.gray(file)}`))
    fs.writeFileSync(
      editorconfig,
      fs.readFileSync(resolve(__dirname, `../${file}`))
    )
  }
}
