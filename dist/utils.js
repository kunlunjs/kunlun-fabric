"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cmdExist = exports.execPromise = exports.generateFile = exports.writeFile = exports.ignores = exports.isExist = void 0;
var child_process_1 = require("child_process");
var fs_extra_1 = require("fs-extra");
var os_1 = __importDefault(require("os"));
var path_1 = require("path");
// https://raw.githubusercontent.com/omnidan/node-emoji/master/lib/emoji.json
// import emoji from 'node-emoji'
var configs_1 = require("./configs");
var root_1 = require("./root");
var isWin32 = os_1.default.platform() === 'win32';
function isExist(config, packageFieldName, filePath) {
    var flag = false;
    if (config.length === 0 && !packageFieldName && filePath) {
        flag = (0, fs_extra_1.existsSync)((0, path_1.resolve)(root_1.cwd, filePath));
    }
    if (packageFieldName && root_1.pkg[packageFieldName]) {
        flag = true;
    }
    else {
        for (var _i = 0, config_1 = config; _i < config_1.length; _i++) {
            var s = config_1[_i];
            if ((0, fs_extra_1.existsSync)((0, path_1.resolve)(root_1.cwd, s))) {
                flag = true;
                break;
            }
        }
    }
    return flag;
}
exports.isExist = isExist;
exports.ignores = [
    // https://editorconfig.org/
    '.editorconfig',
    '.eslintignore',
    '.prettierignore',
    '.stylelintignore'
];
function writeFile(file) {
    var editorconfig = (0, path_1.resolve)(root_1.cwd, file);
    if (!(0, fs_extra_1.existsSync)(editorconfig)) {
        console.log("\u001B[32m\u221A \u001B[90m".concat(file, "\u001B[0m"));
        (0, fs_extra_1.writeFileSync)(editorconfig, (0, fs_extra_1.readFileSync)((0, path_1.resolve)(__dirname, "../".concat(file))));
    }
}
exports.writeFile = writeFile;
function generateFile(filename, _a) {
    var packageFieldName = _a.packageFieldName, contentFile = _a.contentFile, exclude = _a.exclude, output = _a.output;
    output = output || filename;
    var isExistFile = isExist(packageFieldName ? configs_1.configFiles[packageFieldName] : [], packageFieldName, output);
    if (!isExistFile) {
        // Confirm that the folder already exists or create a new one.
        if (output.match(/\//)) {
            var dir = output.match(/(.*\/)[\w\-.]+$/)[1];
            var dirname = (0, path_1.resolve)(root_1.cwd, dir);
            if (!(0, fs_extra_1.existsSync)(dirname)) {
                (0, fs_extra_1.mkdirpSync)(dirname);
            }
        }
        console.log("\u001B[32m\u221A \u001B[90m".concat(output, "\u001B[0m"));
        var content = (0, fs_extra_1.readFileSync)((0, path_1.resolve)(__dirname, contentFile)).toString();
        if (exclude) {
            content = content
                .split('\n')
                .filter(function (i) { return !i.trim().match(new RegExp("^(".concat(exclude.join('|'), ")$"))); })
                .join('\n');
        }
        (0, fs_extra_1.writeFileSync)((0, path_1.resolve)(root_1.cwd, output), content);
    }
}
exports.generateFile = generateFile;
function execPromise(cmd) {
    return new Promise(function (resolve, reject) {
        (0, child_process_1.exec)(cmd, function (err, stdout, stderr) {
            if (err) {
                reject(err);
            }
            else {
                resolve(stdout);
            }
        });
    });
}
exports.execPromise = execPromise;
function cmdExist(cmd) {
    try {
        (0, child_process_1.execSync)(isWin32
            ? "cmd /c \"(help ".concat(cmd, " > nul || exit 0) && where ").concat(cmd, " > nul 2> nul\"")
            : "command -v ".concat(cmd));
        return true;
    }
    catch (_a) {
        return false;
    }
}
exports.cmdExist = cmdExist;
