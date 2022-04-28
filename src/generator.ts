import { resolve } from 'path'
import chalk from 'chalk'
import { existsSync } from 'fs-extra'
import { get } from 'node-emoji'
import ora from 'ora'
import { cwd, pkg } from './root'
import { execPromise, generateFile, ignores, writeFile } from './utils'

generateFile('commit-msg', {
  contentFile: '../.husky/commit-msg',
  output: '.husky/commit-msg'
})
generateFile('pre-commit', {
  contentFile: '../.husky/pre-commit',
  output: '.husky/pre-commit'
})
generateFile('prepare-commit-msg', {
  contentFile: '../.husky/prepare-commit-msg',
  output: '.husky/prepare-commit-msg'
})
generateFile('extensions.json', {
  contentFile: '../.vscode/extensions.json',
  output: '.vscode/extensions.json'
})
generateFile('settings.json', {
  contentFile: '../.vscode/settings.json',
  output: '.vscode/settings.json'
})

ignores.forEach(writeFile)

generateFile('.eslintrc.js', {
  packageFieldName: 'eslintConfig',
  contentFile: '../generate/eslintrc'
})
generateFile('prettier.config.js', {
  packageFieldName: 'prettier',
  contentFile: '../generate/prettier'
})
generateFile('stylelint.config.js', {
  packageFieldName: 'stylelint',
  contentFile: '../generate/stylelint'
})
generateFile('lint-staged.config.js', {
  packageFieldName: 'lint-staged',
  contentFile: '../lint-staged.config.js'
})
generateFile('verify-commit-msg.js', {
  contentFile: '../dist/verify-commit-msg.js'
})

const devDependencies = [
  '@types/eslint',
  '@types/node',
  '@types/prettier',
  'eslint',
  'husky',
  'prettier',
  'stylelint',
  'typescript'
]

async function run() {
  const uninstalled: string[] = []
  for (const dep of devDependencies) {
    // NOTE: 避免重复安装依赖
    // require(cdep)
    // require.resolve(dep.split('@types/').filter(Boolean)[0], {
    //   paths: [resolve(cwd, 'node_modules'), resolve(cwd, 'node_modules/@types')]
    // })
    // TODO: 支持从命令行中判断是否有相关依赖
    if (
      !pkg?.devDependencies?.[dep] &&
      !pkg?.dependencies?.[dep] &&
      !existsSync(resolve(cwd, `node_modules/${dep}`))
    ) {
      uninstalled.push(dep)
    }
  }
  if (uninstalled.length) {
    const spinner = ora({
      // text: `Installation in progress... ${get('coffee')}\n`,
      // spinner: process.argv[2] as any
      // spinner: {
      //   interval: 120,
      //   frames: ['▹▹▹▹▹', '▸▹▹▹▹', '▹▸▹▹▹', '▹▹▸▹▹', '▹▹▹▸▹', '▹▹▹▹▸']
      // }
    })
    spinner.start(`Installation in progress... ${get('coffee')}\n`)
    try {
      for (const dep of uninstalled) {
        let command = 'pnpm'
        let install = 'i'
        const noPnpmLock = existsSync(resolve(cwd, 'pnpm-lock.yaml'))
        if (noPnpmLock && existsSync(resolve(cwd, 'yarn.lock'))) {
          command = 'yarn'
          install = 'add'
        } else if (
          noPnpmLock &&
          existsSync(resolve(cwd, 'package-json.lock'))
        ) {
          command = 'npm'
        }
        // 是否 pnpm monorepo
        let W = ''
        if (existsSync(resolve(cwd, 'pnpm-workspace.yaml'))) {
          W = '-W'
        }
        // TODO: yarn workspace
        // NOTE: husky 依赖 git
        if (dep === 'husky' && !existsSync(resolve(cwd, '.git'))) {
          console.log(chalk.gray(`> git init\n`))
          await execPromise(`git init`)
        }
        // 初始化 husky
        if (dep === 'husky' && !existsSync(resolve(cwd, '.husky'))) {
          console.log(chalk.gray('> yes | npx husky install'))
          await execPromise('yes | npx husky install')
        }
        await execPromise(`${command} ${install} ${dep} -D ${W}`)
      }
      spinner.succeed(`Installed ${devDependencies.join(', ')}`)
    } catch (error) {
      spinner.fail(
        `Install failed with ${devDependencies.join(
          ', '
        )}, you may install them yourself.`
      )
      console.error(error)
    }
  }
}

run()
