// @ts-check
const { defineConfig } = require('eslint-define-config')

require('@rushstack/eslint-patch/modern-module-resolution')

const OFF = 0
const WARNING = 1
const ERROR = 2

module.exports = defineConfig({
  root: true,
  // https://eslint.org/docs/latest/user-guide/configuring/language-options
  env: {
    browser: true,
    commonjs: true,
    es2022: true,
    mocha: true,
    node: true,
    jasmine: true,
    jest: true,
    worker: true
  },
  globals: {
    JSX: true
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true
    }
  },
  ignorePatterns: ['node_modules/*'],
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['html'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      settings: {
        'react': {
          // version: 'detect'
        },
        'import/ignore': ['node_modules', '\\.(css|md|svg|json)$'],
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts']
        },
        'import/resolver': {
          node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx']
          },
          typescript: {
            alwaysTryTypes: true
          }
        },
        'eslint-import-resolver-typescript': {
          alwaysTryTypes: true
        },
        'mdx/code-block': true,
        'mdx/language-mapper': {}
      },
      env: {
        browser: true,
        commonjs: true,
        es2022: true,
        jasmine: true,
        jest: true,
        mocha: true,
        node: true,
        worker: true
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        // 'plugin:node/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:jsx-a11y/recommended',
        'plugin:jest/recommended',
        'plugin:jest-dom/recommended',
        'plugin:testing-library/react',
        'plugin:mdx/recommended',
        'plugin:regexp/recommended',
        'plugin:prettier/recommended'
      ],
      plugins: ['unused-imports' /*, 'tailwindcss'*/],
      rules: {
        'no-restricted-imports': [
          ERROR,
          {
            // patterns: []
          }
        ],
        // 'linebreak-style': [ERROR, 'unix'],

        // import 排序
        'import/default': OFF,
        'import/no-named-as-default': OFF,
        'import/no-named-as-default-member': OFF,
        'import/no-unresolved': ERROR,
        'import/order': [
          WARNING,
          {
            groups: [
              'builtin',
              'external',
              'internal',
              'parent',
              'sibling',
              'index',
              'object'
              // 'type'
            ],
            // 'newlines-between': 'always',
            alphabetize: {
              order: 'asc',
              caseInsensitive: true
            },
            pathGroups: [
              // always put css import to the last, ref:
              // https://github.com/import-js/eslint-plugin-import/issues/1239
              {
                pattern: '*.+(css|sass|less|scss|pcss|styl)',
                group: 'unknown',
                patternOptions: { matchBase: true },
                position: 'after'
              },
              {
                pattern: '@jest/globals',
                group: 'builtin',
                position: 'before'
              },
              { pattern: 'react', group: 'builtin', position: 'before' },
              { pattern: 'fs-extra', group: 'builtin' },
              { pattern: 'lodash', group: 'external', position: 'before' },
              { pattern: 'clsx', group: 'external', position: 'before' },
              {
                pattern: '@/**',
                group: 'internal'
              }
            ],
            pathGroupsExcludedImportTypes: [],
            // see more: https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md#warnonunassignedimports-truefalse
            warnOnUnassignedImports: true
          }
        ],

        '@typescript-eslint/ban-types': [OFF],
        // @ts-ignore
        '@typescript-eslint/ban-ts-comment': [OFF],
        '@typescript-eslint/no-unused-vars': [OFF],
        '@typescript-eslint/no-var-requires': [OFF],
        '@typescript-eslint/no-explicit-any': [OFF],
        '@typescript-eslint/no-empty-function': [OFF],
        '@typescript-eslint/consistent-type-imports': 1,
        // interface Props {}
        '@typescript-eslint/no-empty-interface': [OFF],
        // data!.type
        '@typescript-eslint/no-non-null-assertion': [OFF],
        // `/// <reference types="react" />`
        // '@typescript-eslint/triple-slash-reference': [OFF],
        '@typescript-eslint/explicit-function-return-type': [OFF],
        '@typescript-eslint/explicit-module-boundary-types': [OFF],
        '@typescript-eslint/require-await': OFF,

        'unused-imports/no-unused-imports': 'warn',

        'react/react-in-jsx-scope': OFF,
        'react/no-unescaped-entities': OFF,
        // Sometimes we do need the props as a whole, e.g. when spreading
        'react/destructuring-assignment': OFF,
        'react/function-component-definition': [
          WARNING,
          {
            namedComponents: 'function-declaration',
            unnamedComponents: 'arrow-function'
          }
        ],
        'react/jsx-filename-extension': OFF,
        'react/jsx-key': [ERROR, { checkFragmentShorthand: true }],
        'react/jsx-no-useless-fragment': [ERROR, { allowExpressions: true }],
        'react/jsx-props-no-spreading': OFF,
        'react/no-array-index-key': OFF, // We build a static site, and nearly all components don't change.
        'react/no-unstable-nested-components': [
          WARNING,
          { allowAsProps: true }
        ],
        'react/prefer-stateless-function': WARNING,
        'react/prop-types': OFF,
        'react/require-default-props': [
          ERROR,
          { ignoreFunctionalComponents: true }
        ],
        'react-hooks/rules-of-hooks': ERROR,
        'react-hooks/exhaustive-deps': ERROR,

        'jsx-a11y/anchor-is-valid': OFF,
        'jsx-a11y/aria-role': [OFF],
        'jsx-a11y/click-events-have-key-events': WARNING,
        'jsx-a11y/html-has-lang': OFF,
        'jsx-a11y/no-autofocus': OFF,
        'jsx-a11y/no-noninteractive-element-interactions': WARNING,
        'jsx-a11y/no-redundant-roles': OFF,

        'jest/consistent-test-it': WARNING,
        'jest/expect-expect': OFF,
        'jest/no-large-snapshots': [
          WARNING,
          { maxSize: Infinity, inlineMaxSize: 10 }
        ],
        'jest/no-test-return-statement': ERROR,
        'jest/prefer-expect-resolves': WARNING,
        'jest/prefer-lowercase-title': [WARNING, { ignore: ['describe'] }],
        'jest/prefer-spy-on': WARNING,
        'jest/prefer-to-be': WARNING,
        'jest/prefer-to-have-length': WARNING,
        'jest/require-top-level-describe': ERROR,
        'jest/valid-title': [
          ERROR,
          {
            mustNotMatch: {
              it: [
                '^should|\\.$',
                'Titles should not begin with "should" or end with a full-stop'
              ]
            }
          }
        ],
        'jest/no-deprecated-functions': OFF,

        // use Prettier format rule
        'prettier/prettier': [ERROR, {}, { usePrettierrc: true }]
      }
    },
    {
      files: ['**/__tests__/**/*', '**/*.{spec,test}.*'],
      env: {
        jest: true,
        mocha: true,
        jasmine: true
      }
    },
    {
      files: ['**/*.stories.*'],
      rules: {
        'import/no-anonymous-default-export': 'off'
      }
    }
  ]
})
