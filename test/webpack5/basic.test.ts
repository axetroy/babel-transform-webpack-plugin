import test from "node:test";
import path from "node:path";
import fs from "node:fs";
import webpack from "webpack";
import { createFsFromVolume, Volume } from "memfs";
import { Union } from "unionfs";
import { babelPluginTransformFsPromises } from "babel-plugin-transform-fs-promises";

import BabelTransformPlugin from "../../src/index";

async function compile(input: string, options = {}) {
    const compiler = webpack({
        mode: "none",
        target: "node",
        context: path.resolve(__dirname, "fixtures"),
        entry: input,
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "bundle.js",
        },
        plugins: [
            new BabelTransformPlugin({
                transformOptions: {
                    plugins: [babelPluginTransformFsPromises],
                },
            }),
        ],
        ...options,
    });

    const outputFileSystem = createFsFromVolume(new Volume());
    const inputFileSystem = new Union();
    // @ts-expect-error ignore
    inputFileSystem.use(fs).use(new Volume());

    // @ts-expect-error ignore
    compiler.outputFileSystem = outputFileSystem;
    compiler.inputFileSystem = inputFileSystem;
    compiler.resolverFactory.hooks.resolveOptions.for("normal").tap("BabelTransformPlugin", (resolveOptions) => {
        resolveOptions.fileSystem = inputFileSystem;
        return resolveOptions;
    });

    /**
     * @type {import('webpack').Stats}
     */
    const _stats = await new Promise((resolve, reject) => {
        compiler.run((err, stats) => {
            if (err) {
                reject(err);
            } else {
                resolve(stats);
            }
        });
    });

    const bundlePath = path.resolve(__dirname, "dist", "bundle.js");
    const content = await outputFileSystem.promises.readFile(bundlePath, "utf8");

    return content;
}

test("webpack5 - BabelTransformPlugin: build cjs", async (t) => {
    const content = await compile("./index.cjs");

    t.assert.snapshot(content, {
        serializers: [(value) => value],
    });
});

test("webpack5 - BabelTransformPlugin: build esm", async (t) => {
    const content = await compile("./index.mjs");

    t.assert.snapshot(content, {
        serializers: [(value) => value],
    });
});
