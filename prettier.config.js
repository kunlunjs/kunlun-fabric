// @ts-check
/**
 * @type {import('prettier').Options}
 * @see https://prettier.io/docs/en/options.html
 */
module.exports = {
  parser: 'babel',
  semi: false,
  singleQuote: true,
  quoteProps: 'consistent',
  trailingComma: 'none',
  arrowParens: 'avoid',
  rangeStart: 0,
  rangeEnd: Infinity,
  endOfLine: 'auto',
  importOrder: [
    '^(react/(.*)$)|^(react$)',
    '^(next/(.*)$)|^(next$)',
    '<THIRD_PARTY_MODULES>',
    '',
    '^types$',
    '^@/env(.*)$',
    '^@/types/(.*)$',
    '^@/config/(.*)$',
    '^@/lib/(.*)$',
    '^@/hooks/(.*)$',
    '^@/components/ui/(.*)$',
    '^@/components/(.*)$',
    '^@/styles/(.*)$',
    '^@/app/(.*)$',
    '',
    '^[./]'
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrderBuiltinModulesToTop: true,
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
  plugins: [
    require.resolve('prettier-plugin-tailwindcss'),
    require('@ianvs/prettier-plugin-sort-imports')
  ],
  // tailwindConfig: './<path to>/tailwind.config.js',
  overrides: [
    {
      files:
        '*.{babelrc,eslintrc,huskyrc,lintstagedrc,json,prettierrc,stylelintrc,.stackblitzrc}',
      options: {
        parser: 'json'
      }
    },
    {
      files: '*.{ts,tsx}',
      options: {
        parser: 'typescript'
      }
    },
    {
      files: '*.{ejs,hbs,html}',
      options: {
        parser: 'html'
      }
    },
    {
      files: '*.vue',
      options: {
        parser: 'vue'
      }
    },
    {
      files: '*.md',
      options: {
        parser: 'markdown'
      }
    },
    {
      files: '*.mdx',
      options: {
        parser: 'mdx'
      }
    },
    {
      files: '*.css',
      options: {
        parser: 'css'
      }
    },
    {
      files: '*.less',
      options: {
        parser: 'less'
      }
    },
    {
      files: '*.scss',
      options: {
        parser: 'scss'
      }
    },
    {
      files: '*.yaml',
      options: {
        parser: 'yaml'
      }
    },
    {
      files: ['*.yml'],
      options: {
        singleQuote: false
      }
    },
    {
      files: ['*.json5'],
      options: {
        singleQuote: false,
        quoteProps: 'preserve'
      }
    }
  ]
}
