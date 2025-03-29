import type { Compiler } from "webpack";
import type { TransformOptions } from "@babel/core";

export interface BabelTransformPluginOptions {
    /**
     * The Babel configuration file to use.
     * It will not lookup .babelrc file in the project root.
     */
    transformOptions?: Omit<
        TransformOptions,
        "root" | "babelrc" | "filename" | "ast" | "browserslistConfigFile" | "ignore" | "include" | "exclude"
    >;
    /**
     * Filter function to determine which files to transform.
     * @param fullPath - The fullPath of the file being transformed.
     * @returns
     */
    filter?: (fullPath: string) => boolean;
}

declare class BabelTransformPlugin {
    constructor(options?: BabelTransformPluginOptions);
    /**
     * Apply the plugin
     */
    apply(compiler: Compiler): void;
}

export { BabelTransformPlugin };
export default BabelTransformPlugin;
