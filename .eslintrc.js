// @ts-check
const { defineConfig } = require('eslint-define-config')

require('@rushstack/eslint-patch/modern-module-resolution')

const OFF = 0
const WARNING = 1
const ERROR = 2

module.exports = defineConfig({
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
    jest: true
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
        es2021: true,
        node: true,
        browser: true
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        // 'plugin:node/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:jest/recommended',
        'plugin:jest-dom/recommended',
        'plugin:testing-library/react',
        'plugin:mdx/recommended',
        'plugin:regexp/recommended',
        'plugin:prettier/recommended'
      ],
      plugins: ['import', 'unused-imports', 'tailwindcss'],
      rules: {
        'no-restricted-imports': [
          ERROR,
          {
            // patterns: []
          }
        ],
        // 'linebreak-style': [ERROR, 'unix'],

        // import 排序
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
            // example: let `import './nprogress.css';` after importing others
            // in `packages/docusaurus-theme-classic/src/nprogress.ts`
            // see more: https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md#warnonunassignedimports-truefalse
            warnOnUnassignedImports: true
          }
        ],

        // 允许空类型
        '@typescript-eslint/ban-types': [OFF],
        // 允许 @ts-ignore
        '@typescript-eslint/ban-ts-comment': [OFF],
        // 允许已声明但未使用的变量
        '@typescript-eslint/no-unused-vars': [OFF],
        // 允许使用 require
        '@typescript-eslint/no-var-requires': [OFF],
        '@typescript-eslint/no-explicit-any': [OFF],
        // 允许空函数
        '@typescript-eslint/no-empty-function': [OFF],
        '@typescript-eslint/consistent-type-imports': 1,
        // 允许空类型声明 interface Props {}
        '@typescript-eslint/no-empty-interface': [OFF],
        // 允许非空断言 data!.type
        '@typescript-eslint/no-non-null-assertion': [OFF],
        // 允许使用 /// <reference types="react" />
        // '@typescript-eslint/triple-slash-reference': [OFF],
        '@typescript-eslint/explicit-function-return-type': [OFF],
        '@typescript-eslint/explicit-module-boundary-types': [OFF],
        '@typescript-eslint/require-await': OFF,

        'import/default': 0,
        'import/no-named-as-default-member': OFF,
        'import/no-named-as-default': OFF,

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
        jest: true
      }
    }
  ]
})
