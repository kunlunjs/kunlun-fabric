import { execSync } from 'child_process'
import { resolve } from 'path'
import { existsSync } from 'fs-extra'
import { get } from 'node-emoji'
import ora from 'ora'
import { cwd, generateConfig, ignores, writeFile } from './utils'

generateConfig('commit-msg', {
  contentFile: '../.husky/commit-msg',
  output: '.husky/commit-msg'
})
generateConfig('pre-commit', {
  contentFile: '../.husky/pre-commit',
  output: '.husky/pre-commit'
})
generateConfig('prepare-commit-msg', {
  contentFile: '../.husky/prepare-commit-msg',
  output: '.husky/prepare-commit-msg'
})
generateConfig('extensions.json', {
  contentFile: '../.vscode/extensions.json',
  output: '.vscode/extensions.json'
})
generateConfig('settings.json', {
  contentFile: '../.vscode/settings.json',
  output: '.vscode/settings.json'
})

ignores.forEach(writeFile)

generateConfig('.eslintrc.js', {
  packageConfigName: 'eslintConfig',
  contentFile: '../generate/eslintrc'
})
generateConfig('prettier.config.js', {
  packageConfigName: 'prettier',
  contentFile: '../generate/prettier'
})
generateConfig('stylelint.config.js', {
  packageConfigName: 'stylelint',
  contentFile: '../generate/stylelint'
})
generateConfig('lint-staged.config.js', {
  packageConfigName: 'lint-staged',
  contentFile: '../lint-staged.config.js'
})
generateConfig('verify-commit-msg.js', {
  contentFile: '../dist/verify-commit-msg.js'
})

const devDependencies = [
  '@types/eslint',
  '@types/node',
  '@types/prettier',
  'eslint',
  'husky',
  'prettier',
  'stylelint'
]

const uninstalled: string[] = []
for (const dep of devDependencies) {
  // const cdep = resolve(cwd, dep)
  // TODO: 避免重复安装依赖
  // require(cdep)
  // require.resolve(dep.split('@types/').filter(Boolean)[0], {
  //   paths: [resolve(cwd, 'node_modules'), resolve(cwd, 'node_modules/@types')]
  // })
  if (!existsSync(resolve(cwd, `node_modules/${dep}`))) {
    uninstalled.push(dep)
  }
}
if (uninstalled.length) {
  const spinner = ora({
    text: `Installation in progress... ${get('coffee')}`,
    spinner: {
      interval: 120,
      frames: ['▹▹▹▹▹', '▸▹▹▹▹', '▹▸▹▹▹', '▹▹▸▹▹', '▹▹▹▸▹', '▹▹▹▹▸']
    }
  })
  spinner.start()
  for (const dep of uninstalled) {
    let command = 'pnpm'
    let install = 'i'
    const noPnpmLock = existsSync(resolve(cwd, 'pnpm-lock.yaml'))
    if (noPnpmLock && existsSync(resolve(cwd, 'yarn.lock'))) {
      command = 'yarn'
      install = 'add'
    } else if (noPnpmLock && existsSync(resolve(cwd, 'package-json.lock'))) {
      command = 'npm'
    }
    // 是否 pnpm monorepo
    let W = ''
    if (existsSync(resolve(cwd, 'pnpm-workspace.yaml'))) {
      W = '-W'
    }
    // TODO: yarn workspace
    execSync(`${command} ${install} ${dep} -D ${W}`)
  }
  spinner.succeed(`Installed ${devDependencies.join(', ')}`)
}
