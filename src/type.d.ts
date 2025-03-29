import type { Compiler } from "webpack";
import type { TransformOptions } from "@babel/core";

export interface BabelTransformPluginOptions {
    transformOptions?: Omit<
        TransformOptions,
        "root" | "babelrc" | "filename" | "ast" | "browserslistConfigFile" | "ignore" | "include" | "exclude"
    >;
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
