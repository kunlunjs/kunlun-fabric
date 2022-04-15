# eslint-plugin

ESLint/Prettier/StyleLint configuration for Kunlun projects

## Installation

```bash
pnpm i @kunlunjs/fabric eslint prettier stylelint -D

```

## Usage

> .eslintrc.js

```js
const { defineConfig, eslintConfig } = require('kunlunjs/fabric')

// @ts-check
module.exports = defineConfig({
  extends: [eslintConfig]
})
// or
module.exports = {
  extends: [eslintConfig]
}
```

> .prettierrc.js

```js
const { prettierConfig } = require('kunlunjs/fabric')

// @ts-check
/**
 * @type {import('prettier').Options}
 * @see https://prettier.io/docs/en/options.html
 */
module.exports = {
  ...prettierConfig
}
```

> .stylelintrc.js

```js
const { stylelintConfig } = require('kunlunjs/fabric')

/**
 * @type {import('stylelint').Config}
 */
module.exports = {
  extends: [stylelintConfig]
}
```

## Development

- [.eslintrc.js](.eslintrc.js)
- [.prettierrc.js](.prettierrc.js)
- [.stylelintrc.js](.stylelintrc.js)
