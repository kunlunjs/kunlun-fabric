"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var defineStylelintConfig = function (syntax) {
    if (syntax === void 0) { syntax = 'less'; }
    return ({
        extends: [
            syntax === 'less'
                ? 'stylelint-config-standard'
                : 'stylelint-config-standard-scss',
            'stylelint-config-css-modules',
            'stylelint-config-rational-order',
            'stylelint-no-unsupported-browser-features',
            'stylelint-config-prettier'
        ],
        plugins: ['stylelint-declaration-block-no-ignored-properties'],
        customSyntax: 'postcss-less',
        rules: {
            'block-no-empty': null,
            'no-empty-source': null,
            'at-rule-no-unknown': null,
            'selector-class-pattern': null,
            'no-descending-specificity': null
        }
    });
};
module.exports = defineStylelintConfig;
