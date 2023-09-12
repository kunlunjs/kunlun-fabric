module.exports = {
  '*.{js,jsx,ts,tsx}': [
    // https://eslint.org/docs/user-guide/command-line-interface
    'eslint --config ./.eslintrc.js --ignore-path ./.eslintignore --fix --color --',
    "bash -c 'npm run types:check'"
  ],
  '*.{css,less,sass,scss,styl}': [
    // https://stylelint.io/user-guide/usage/cli
    'stylelint --config ./stylelint.config.js --allow-empty-input -i ./.stylelintignore --fix'
  ],
  '*': [
    // https://prettier.io/docs/en/cli.html
    'prettier --config prettier.config.js --ignore-unknown --ignore-path ./.prettierignore --write --list-different'
    // "cspell --no-must-find-files --no-progress"
  ]
}
