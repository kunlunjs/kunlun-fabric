# @kunlunjs/fabric

ESLint/Prettier/StyleLint configuration for Kunlun projects

## Installation

<b>如要使 eslint、prettier、stylelint 配置生效，必须要安装对应包</b>

```bash
pnpm i @kunlunjs/fabric eslint prettier stylelint -D
# 可选安装
pnpm i @types/prettier @types/eslint -D
```

## Usage

在项目根目录建如下文件

> .eslintrc.js

```js
// @ts-check
/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  extends: [require.resolve('@kunlunjs/fabric/dist/eslint')]
}

// 或者安装使用 pnpm i eslint-define-config -D

const { defineConfig } = require('eslint-define-config')
module.exports = defineConfig({
  extends: [require.resolve('@kunlunjs/fabric/dist/eslint')]
})
```

> .prettierrc.js

```js
const prettierConfig = require('@kunlunjs/fabric/dist/prettier')

// @ts-check
/**
 * 安装 @types/prettier，可选
 * @type {import('prettier').Config}
 */
module.exports = {
  ...prettierConfig,
  // 如果使用了 tailwindcss，默认查找 prettier 配置文件同目录的 tailwindcss.config.js 文件，在其它位置则需指定，如
  tailwindConfig: './packages/web/tailwind.config.js'
}
```

> .stylelintrc.js

```js
// @ts-check
/**
 * @type {import('stylelint').Config}
 */
module.exports = {
  extends: [require.resolve('@kunlunjs/fabric/dist/stylelint')]
}
```

## Attention

eslint 和 prettier 可能会默认不检查 . 命名开头的文件，如 .eslintrc.js、.prettierrc.js 等，需要在 .eslintignore 和 .prettierignore 中加入强制开启检查

```
!.commitlintrc.js
!.eslintrc.js
!.prettierrc.js
!.stylelintrc.js
```

## Development

<b>默认配置规则如下</b>

- [eslint](src/eslint.ts)
- [prettier](src/prettier.ts)
- [stylelint](src/stylelint.ts)

#### build

```bash
pnpm build
```
