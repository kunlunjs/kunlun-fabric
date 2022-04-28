# @kunlunjs/fabric

项目基础配置，包括 ESLint、Prettier、StyleLint、Husky、lint-staged、git commit message verify 等。

## Installation

```bash
pnpm i @kunlunjs/fabric -D
```

## Usage

在项目根目录将会自动生成如下文件，其中 ESLint/Prettier/StyleLint 判断依据是是否包含[这些文件](./src/configs.ts)，
自动安装如下依赖 @types/prettier @types/eslint、eslint、prettier、stylelint、husky、lint-staged、typescript，
由于 husky 的初始化需要依赖 git，所以会先判断 .git 是否存在，如不存在会先使用 `git init` 初始化 git 环境。

- [verify-commit-msg.js]("./dist/verify-commit-msg.js") 检查 git commit message 格式是否满足要求
- [.husky/commit-msg]("./.husky/commit-msg") 触发执行 verify-commit-msg
- [.husky/pre-commit]("./.husky/pre-commit") 触发 lint-staged
- [.husky/prepare-commit-msg]("./.husky/prepare-commit-msg") 触发为 git commit message 增加图标前缀
- [.vscode/extensions.json]("./.vscode/extensions.json") 推荐 VSCode 插件
- [.vscode/settings.json]("./.vscode/settings.json") 推荐 VSCode 配置
- [lint-staged.config.js]("./lint-staged.config.js") 提交文件
- [.eslintrc.js]("./generate/eslintrc") JS/TS 语法检查
- [.eslintignore]("./.eslintignore") JS/TS 语法检查忽略文件
- [prettier.config.js]("./generate/prettier") 格式化
- [.prettierignore]("./.prettierignore") 格式化忽略文件
- [stylelint.config.js]("./generate/stylelint") 样式检查
- [.stylelintignore]("./.stylelintignore") 样式检查忽略文件

## Attention

eslint 和 prettier 可能会默认不检查 . 命名开头的文件，如 .eslintrc.js、.prettierrc.js 等，需要在 .eslintignore 和 .prettierignore 中加入强制开启检查

```
!.eslintrc.js
!.prettierrc.js
!.stylelintrc.js
```

## Development

<b>默认配置规则如下</b>

- [.husky/commit-msg](.husky/commit-msg)
- [.husky/pre-commit](.husky/pre-commit)
- [.husky/prepare-commit-msg](.husky/prepare-commit-msg)
- [.vscode/extensions.json](.vscode/extensions.json)
- [.vscode/settings.json](.vscode/settings.json)
- [eslint](src/eslint.ts)
- [.eslintignore](.eslintignore)
- [prettier](src/prettier.ts)
- [.prettierignore](.prettierignore)
- [stylelint](src/stylelint.ts)
- [.stylelintignore](.stylelintignore)
- [lint-staged.config.js](lint-staged.config.js)
- [verify-commit-msg.js](verify-commit-msg.js)

## build

```bash
pnpm build
```
