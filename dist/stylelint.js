"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var defineStylelintConfig = {
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
        'at-rule-no-unknown': null,
        'block-no-empty': null,
        'no-descending-specificity': null,
        'no-empty-source': null,
        'selector-class-pattern': null,
        'prettier/prettier': true
    }
};
module.exports = defineStylelintConfig;
