import type { Config } from 'stylelint'

const defineStylelintConfig: Config = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-css-modules',
    'stylelint-config-rational-order',
    'stylelint-no-unsupported-browser-features',
    'stylelint-prettier/recommended'
  ],
  plugins: [
    'stylelint-prettier',
    'stylelint-declaration-block-no-ignored-properties'
  ],
  customSyntax: require('postcss-less'),
  rules: {
    'block-no-empty': null,
    'no-empty-source': null,
    'at-rule-no-unknown': null,
    'selector-class-pattern': null,
    'no-descending-specificity': null,
    'prettier/prettier': true
  }
}

module.exports = defineStylelintConfig
