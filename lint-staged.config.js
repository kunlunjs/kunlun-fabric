module.exports = {
  '*.{js,jsx,ts,tsx}': [
    // 'npm run lint', "lint": "eslint --fix --ext .js,.ts,.tsx ./src --ignore-path .gitignore",
    // "bash -c 'npm run types:check'", "format:check": "npm run prettier -- --list-different",
    // 'npm run format:check', "tsc --project tsconfig.json --pretty --noEmit",
    // https://eslint.org/docs/user-guide/command-line-interface
    'eslint --config ./.eslintrc.js --ignore-path ./.eslintignore --fix --color --'
  ],
  '*.{css,less,sass,scss,styl}': [
    // https://stylelint.io/user-guide/usage/cli
    'stylelint --config ./stylelint.config.js --allow-empty-input -i ./.stylelintignore --fix'
  ],
  '*': [
    // https://prettier.io/docs/en/cli.html
    'prettier --ignore-unknown --ignore-path ./.prettierignore --write --list-different'
    // "cspell --no-must-find-files --no-progress"
  ]
}
