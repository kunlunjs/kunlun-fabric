/**
 * @type {import('stylelint').Config}
 */
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-css-modules',
    'stylelint-config-rational-order',
    'stylelint-no-unsupported-browser-features',
    'stylelint-config-prettier'
  ],
  customSyntax: 'postcss-less',
  rules: {
    'block-no-empty': null,
    'no-empty-source': null,
    'at-rule-no-unknown': null,
    'no-descending-specificity': null
  },
  plugins: ['stylelint-declaration-block-no-ignored-properties']
}
