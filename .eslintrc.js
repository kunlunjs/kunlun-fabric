const { defineConfig } = require('eslint-define-config')

require('@rushstack/eslint-patch/modern-module-resolution')

// @ts-check
module.exports = defineConfig({
  root: true,
  env: {
    es2021: true,
    node: true,
    jest: true
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
        'plugin:prettier/recommended'
      ],
      plugins: ['import', 'unused-imports', 'tailwindcss'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            // patterns: []
          }
        ],
        // 'linebreak-style': ['error', 'unix'],

        // import 排序
        'import/order': [
          'error',
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
              {
                pattern: '@/**',
                group: 'internal'
              }
            ]
          }
        ],
        'import/default': 'off',
        'import/no-named-as-default-member': 'off',
        'import/no-named-as-default': 'off',

        'unused-imports/no-unused-imports': 'warn',

        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/no-unescaped-entities': 'off',

        'jsx-a11y/aria-role': ['off'],
        'jsx-a11y/no-autofocus': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
        'jsx-a11y/no-redundant-roles': 'off',

        // 允许空类型
        '@typescript-eslint/ban-types': ['off'],
        // 允许 @ts-ignore
        '@typescript-eslint/ban-ts-comment': ['off'],
        // 允许已声明但未使用的变量
        '@typescript-eslint/no-unused-vars': ['off'],
        // 允许使用 require
        '@typescript-eslint/no-var-requires': ['off'],
        '@typescript-eslint/no-explicit-any': ['off'],
        // 允许空函数
        '@typescript-eslint/no-empty-function': ['off'],
        '@typescript-eslint/consistent-type-imports': 1,
        // 允许空类型声明 interface Props {}
        '@typescript-eslint/no-empty-interface': ['off'],
        // 允许非空断言 data!.type
        '@typescript-eslint/no-non-null-assertion': ['off'],
        // 允许使用 /// <reference types="react" />
        // '@typescript-eslint/triple-slash-reference': ['off'],
        '@typescript-eslint/explicit-function-return-type': ['off'],
        '@typescript-eslint/explicit-module-boundary-types': ['off'],
        //
        'jest/no-deprecated-functions': ['off'],
        // 使用 prettier 格式化规则
        'prettier/prettier': ['error', {}, { usePrettierrc: true }]
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
