# @kunlunjs/fabric

Project basic configurations include ESLint, Prettier, StyleLint, Husky, lint-staged, and Git Commit message Verify.

## Installation

```bash
pnpm i @kunlunjs/fabric -D
# Where "@types/prettier" "@types/eslint" "stylelint" is optional
pnpm i @types/prettier prettier @types/eslint eslint stylelint devmoji husky lint-staged @types/node typescript -D
```

## Usage

In the project root directory will be automatically generate the following documents, including [ESLint](https://eslint.org/)/[Prettier](https://prettier.io/)/[StyleLint](https://stylelint.io/) judgment is whether to include [these files](./src/configs.ts),
Since [Husky](https://typicode.github.io/husky/#/)'s initialization depends on Git, it determines whether.git exists. If it doesn't, it initialses the git environment with 'git init' and then adds' prepare 'to package.json scripts: "husky install"`.

- [.husky/commit-msg]("./.husky/commit-msg") Trigger git "commit-msg" hook.
- [.husky/pre-commit]("./.husky/pre-commit") Trigger git "pre-commit" hook.
- [.husky/prepare-commit-msg]("./.husky/prepare-commit-msg") Trigger git "prepare-commit-msg" hook.
- [.vscode/extensions.json]("./.vscode/extensions.json") Recommended VSCode extensions.
- [.vscode/settings.json]("./.vscode/settings.json") Recommended VSCode configuration.
- [lint-staged.config.js]("./lint-staged.config.js") [lint-staged](https://github.com/okonet/lint-staged) configuration file - Run linters on git staged files.
- [.eslintrc.js]("./generate/eslintrc") [ESLint](https://eslint.org/) configuration file - Find and fix problems in your JavaScript code.
- [.eslintignore]("./.eslintignore") [ESLint](https://eslint.org/) ignore files configuration.
- [prettier.config.js]("./generate/prettier") [Prettier](https://prettier.io/) configuration file - An opinionated code formatter.
- [.prettierignore]("./.prettierignore") [Prettier](https://prettier.io/) ignore files configuration.
- [stylelint.config.js]("./generate/stylelint") [StyleLint](https://stylelint.io/) configuration file - A mighty, modern linter that helps you avoid errors and enforce conventions in your styles.
- [.stylelintignore]("./.stylelintignore") [StyleLint](https://stylelint.io/) ignore files configuration.
- [verify-commit-msg.js]("./dist/verify-commit-msg.js") Check whether the Git Commit Message format meets requirements.

## Attention

ESLint and Prettier may not check files that start with. eslintrc.js or ".prettier.js" by default. You need to run the ".eslintignore" and ".prettierignore "for mandatory checking.

```
!.eslintrc.js
!.prettierrc.js
!.stylelintrc.js
```

## Development

Create a new project and go to the root directory
1. `mkdir <dirname> && cd <dirname>`
Inside the project root directory
2. `npm init -y`
Run the command to check whether the following configuration file is generated
3. `ts-node <path>/kunlun-fabric/src/generator.ts`

<b>The default configuration rules are as follows</b>

- [.husky/commit-msg](.husky/commit-msg)
- [.husky/pre-commit](.husky/pre-commit)
- [.husky/prepare-commit-msg](.husky/prepare-commit-msg)
- [.vscode/extensions.json](.vscode/extensions.json)
- [.vscode/settings.json](.vscode/settings.json)
- [.eslintrc.js](src/eslint.ts)
- [.editorconfig](.editorconfig)
- [.eslintignore](.eslintignore)
- [.prettierignore](.prettierignore)
- [.stylelintignore](.stylelintignore)
- [lint-staged.config.js](lint-staged.config.js)
- [prettier.config.js](src/prettier.ts)
- [stylelint.config.js](src/stylelint.ts)
- [verify-commit-msg.js](verify-commit-msg.js)

## Build

```bash
pnpm build
```
