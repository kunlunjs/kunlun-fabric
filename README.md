# @kunlunjs/fabric

ESLint/Prettier/StyleLint configuration for Kunlun projects

## Installation

```bash
pnpm i @kunlunjs/fabric eslint prettier stylelint -D

```

## Usage

> .eslintrc.js

```js
// @ts-check
module.exports = {
  extends: [require.resolve('@kunlunjs/fabric/dist/eslint')]
}
```

> .prettierrc.js

```js
const prettierConfig = require('@kunlunjs/fabric/dist/prettier')

// @ts-check
module.exports = {
  ...prettierConfig
}
```

> .stylelintrc.js

```js
module.exports = {
  extends: [require.resolve('@kunlunjs/fabric/dist/stylelint')]
}
```

## Development

- [eslint](src/eslint.ts)
- [prettier](src/prettier.ts)
- [stylelint](src/stylelint.ts)

#### build

```bash
pnpm build
```
