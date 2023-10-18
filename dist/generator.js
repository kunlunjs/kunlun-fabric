"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var command_exists_1 = require("command-exists");
var node_emoji_1 = require("node-emoji");
var root_1 = require("./root");
var utils_1 = require("./utils");
(0, utils_1.generateFile)('commit-msg', {
    contentFile: '../.husky/commit-msg',
    output: '.husky/commit-msg'
});
(0, utils_1.generateFile)('pre-commit', {
    contentFile: '../.husky/pre-commit',
    output: '.husky/pre-commit'
});
(0, utils_1.generateFile)('prepare-commit-msg', {
    contentFile: '../.husky/prepare-commit-msg',
    output: '.husky/prepare-commit-msg'
});
(0, utils_1.generateFile)('extensions.json', {
    contentFile: '../.vscode/extensions.json',
    output: '.vscode/extensions.json'
});
(0, utils_1.generateFile)('settings.json', {
    contentFile: '../.vscode/settings.json',
    output: '.vscode/settings.json'
});
utils_1.ignores.forEach(utils_1.writeFile);
(0, utils_1.generateFile)('.eslintrc.js', {
    packageFieldName: 'eslintConfig',
    contentFile: '../generate/eslintrc'
});
(0, utils_1.generateFile)('prettier.config.js', {
    packageFieldName: 'prettier',
    contentFile: '../generate/prettier'
});
(0, utils_1.generateFile)('stylelint.config.js', {
    packageFieldName: 'stylelint',
    contentFile: '../generate/stylelint'
});
(0, utils_1.generateFile)('lint-staged.config.js', {
    packageFieldName: 'lint-staged',
    contentFile: '../lint-staged.config.js'
});
(0, utils_1.generateFile)('verify-commit-msg.js', {
    contentFile: '../verify-commit-msg.js'
});
(0, utils_1.generateFile)('.npmrc', {
    contentFile: '../.npmrc'
});
(0, utils_1.generateFile)('.ls-lint.yml', {
    contentFile: '../.ls-lint.yml'
});
var devDependencies = [
    '@types/node',
    '@types/eslint',
    'husky',
    'devmoji',
    'eslint',
    'prettier',
    'stylelint',
    'typescript'
];
function run() {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var uninstalled, _i, devDependencies_1, dep, command;
        return __generator(this, function (_c) {
            uninstalled = [];
            for (_i = 0, devDependencies_1 = devDependencies; _i < devDependencies_1.length; _i++) {
                dep = devDependencies_1[_i];
                // NOTE: 避免重复安装依赖
                // require(cdep)
                // require.resolve(dep.split('@types/').filter(Boolean)[0], {
                //   paths: [resolve(cwd, 'node_modules'), resolve(cwd, 'node_modules/@types')]
                // })
                // TODO: 支持从命令行中判断是否有相关依赖
                if (!((_a = root_1.pkg === null || root_1.pkg === void 0 ? void 0 : root_1.pkg.devDependencies) === null || _a === void 0 ? void 0 : _a[dep]) &&
                    !((_b = root_1.pkg === null || root_1.pkg === void 0 ? void 0 : root_1.pkg.dependencies) === null || _b === void 0 ? void 0 : _b[dep])
                // !existsSync(resolve(cwd, `node_modules/${dep}`))
                ) {
                    uninstalled.push(dep);
                }
            }
            if (uninstalled.length) {
                command = 'npm';
                if ((0, command_exists_1.sync)('pnpm')) {
                    command = 'pnpm';
                }
                // let install = 'i'
                // const pnpmLock = existsSync(resolve(cwd, 'pnpm-lock.yaml'))
                // const yarnLock = existsSync(resolve(cwd, 'yarn.lock'))
                // const packageLock = existsSync(resolve(cwd, 'package-json.lock'))
                if ((0, command_exists_1.sync)('yarn') && !(0, command_exists_1.sync)('pnpm')) {
                    command = 'yarn';
                    // install = 'add'
                }
                // TODO: 自动安装相关依赖
                // const spinner = ora({
                //   // text: `Installation in progress... ${get('coffee')}\n`
                //   // spinner: process.argv[2] as any
                //   // spinner: {
                //   //   interval: 120,
                //   //   frames: ['▹▹▹▹▹', '▸▹▹▹▹', '▹▸▹▹▹', '▹▹▸▹▹', '▹▹▹▸▹', '▹▹▹▹▸']
                //   // }
                // })
                // spinner.start(`Installation in progress... ${get('coffee')}\n`)
                // try {
                //   for (const dep of uninstalled) {
                // NOTE: husky 依赖 git
                //     if (dep === 'husky' && !existsSync(resolve(cwd, '.git'))) {
                //       console.log(chalk.gray(`> git init\n`))
                //       await execPromise(`git init`)
                //       console.log(chalk.gray('> yes | npx husky install'))
                //       await execPromise('yes | npx husky install')
                //     }
                //     // 初始化 husky
                //     // if (dep === 'husky' && !existsSync(resolve(cwd, '.husky'))) {
                //     //   console.log(chalk.gray('> yes | npx husky install'))
                //     //   await execPromise('yes | npx husky install')
                //     // }
                //   }
                //   const deps = uninstalled.join(' ')
                //   const pnpmWorkspace = existsSync(resolve(cwd, 'pnpm-workspace.yaml'))
                //   // 是否 pnpm monorepo
                //   let W = ''
                //   if (pnpmWorkspace) {
                //     W = '-W'
                //   }
                //   await execPromise(`cd ${cwd} && ${command} ${install} ${deps} -D ${W}`)
                //   spinner.succeed(`Installed ${devDependencies.join(', ')}`)
                //   process.exit(1)
                // } catch (error) {
                //   spinner.fail(
                //     `Install failed with ${devDependencies.join(
                //       ', '
                //     )}, you may install them yourself.`
                //   )
                //   console.error(error)
                //   process.exit(1)
                // }
                console.log("".concat((0, node_emoji_1.get)('point_right'), " ").concat("\u001B[93mExecute command \"".concat(command, " i ").concat(uninstalled.join(' '), " -D\" to install devDependencies\u001B[0m")));
            }
            return [2 /*return*/];
        });
    });
}
run();
