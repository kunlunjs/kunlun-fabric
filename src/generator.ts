import { sync } from 'command-exists'
import { get } from 'node-emoji'
import { pkg } from './root'
import { generateFile, ignores, writeFile } from './utils'

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
  contentFile: '../verify-commit-msg.js'
})
generateFile('.npmrc', {
  contentFile: '../.npmrc'
})

const devDependencies = [
  '@types/node',
  '@types/eslint',
  'husky',
  'devmoji',
  'eslint',
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
      !pkg?.dependencies?.[dep]
      // !existsSync(resolve(cwd, `node_modules/${dep}`))
    ) {
      uninstalled.push(dep)
    }
  }
  if (uninstalled.length) {
    let command = 'npm'
    if (sync('pnpm')) {
      command = 'pnpm'
    }
    // let install = 'i'
    // const pnpmLock = existsSync(resolve(cwd, 'pnpm-lock.yaml'))
    // const yarnLock = existsSync(resolve(cwd, 'yarn.lock'))
    // const packageLock = existsSync(resolve(cwd, 'package-json.lock'))
    if (sync('yarn') && !sync('pnpm')) {
      command = 'yarn'
      // install = 'add'
    }
    // TODO: 自动安装相关依赖
    // const spinner = ora({
    //   // text: `Installation in progress... ${get('coffee')}\n`
    //   // spinner: process.argv[2] as any
    //   // spinner: {
    //   //   interval: 120,
    //   //   frames: ['▹▹▹▹▹', '▸▹▹▹▹', '▹▸▹▹▹', '▹▹▸▹▹', '▹▹▹▸▹', '▹▹▹▹▸']
    //   // }
    // })
    // spinner.start(`Installation in progress... ${get('coffee')}\n`)
    // try {
    //   for (const dep of uninstalled) {
    // NOTE: husky 依赖 git
    //     if (dep === 'husky' && !existsSync(resolve(cwd, '.git'))) {
    //       console.log(chalk.gray(`> git init\n`))
    //       await execPromise(`git init`)
    //       console.log(chalk.gray('> yes | npx husky install'))
    //       await execPromise('yes | npx husky install')
    //     }
    //     // 初始化 husky
    //     // if (dep === 'husky' && !existsSync(resolve(cwd, '.husky'))) {
    //     //   console.log(chalk.gray('> yes | npx husky install'))
    //     //   await execPromise('yes | npx husky install')
    //     // }
    //   }
    //   const deps = uninstalled.join(' ')
    //   const pnpmWorkspace = existsSync(resolve(cwd, 'pnpm-workspace.yaml'))
    //   // 是否 pnpm monorepo
    //   let W = ''
    //   if (pnpmWorkspace) {
    //     W = '-W'
    //   }
    //   await execPromise(`cd ${cwd} && ${command} ${install} ${deps} -D ${W}`)
    //   spinner.succeed(`Installed ${devDependencies.join(', ')}`)
    //   process.exit(1)
    // } catch (error) {
    //   spinner.fail(
    //     `Install failed with ${devDependencies.join(
    //       ', '
    //     )}, you may install them yourself.`
    //   )
    //   console.error(error)
    //   process.exit(1)
    // }

    console.log(
      `${get(
        'point_right'
      )} ${`\x1b[93mExecute command "${command} i ${uninstalled.join(
        ' '
      )} -D" to install devDependencies\x1b[0m`}`
    )
  }
}

run()
