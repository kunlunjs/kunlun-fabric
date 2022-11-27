import { configFiles } from './configs';
type packageFieldName = keyof typeof configFiles;
export declare function isExist(config: string[], packageFieldName?: packageFieldName, filePath?: string): boolean;
export declare const ignores: readonly [".editorconfig", ".eslintignore", ".prettierignore", ".stylelintignore"];
export declare function writeFile(file: typeof ignores[number]): void;
export declare function generateFile(filename: 'commit-msg' | 'pre-commit' | 'prepare-commit-msg' | 'lint-staged.config.js' | 'verify-commit-msg.js' | '.eslintrc.js' | 'prettier.config.js' | 'stylelint.config.js' | 'extensions.json' | 'launch.json' | 'settings.json', { packageFieldName, contentFile, exclude, output }: {
    /**
     * 在 package.json 中的 name
     */
    packageFieldName?: packageFieldName;
    /**
     * 内容
     */
    contentFile?: string;
    /**
     * 需要排除的内容
     */
    exclude?: string[];
    /**
     * 输出目录
     */
    output?: string;
}): void;
export declare function execPromise(cmd: string): Promise<string>;
export declare function cmdExist(cmd: 'yarn' | 'pnpm'): boolean;
export {};
