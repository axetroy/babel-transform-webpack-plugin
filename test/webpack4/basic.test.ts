import test from "node:test";
import path from "node:path";
import fs from "node:fs";
import webpack from "webpack4";
import { createFsFromVolume, Volume } from "memfs3";
import { Union } from "unionfs2";
import { babelPluginTransformFsPromises } from "babel-plugin-transform-fs-promises";
import { createTwoFilesPatch } from "diff";

import BabelTransformPlugin from "../../src/index";
import { Stats } from "webpack";

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
		plugins: [new BabelTransformPlugin()],
		...options,
	});

	const outputFileSystem = createFsFromVolume(new Volume());
	// @ts-expect-error polyfill the join method that webpack4 need
	outputFileSystem.join = path.join;
	const inputFileSystem = new Union();
	inputFileSystem.use(fs).use(new Volume());

	compiler.outputFileSystem = outputFileSystem;
	compiler.inputFileSystem = inputFileSystem;
	compiler.resolverFactory.hooks.resolveOptions.for("normal").tap("BabelTransformPlugin", (resolveOptions) => {
		resolveOptions.fileSystem = inputFileSystem;
		return resolveOptions;
	});

	const _stats = await new Promise<Stats | undefined>((resolve, reject) => {
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

	return content.toString();
}

test("webpack4 - BabelTransformPlugin: build cjs", async (t) => {
	const content = await compile("./index.cjs");

	t.assert.snapshot(content, {
		serializers: [(value) => value],
	});
});

test("webpack4 - BabelTransformPlugin: build esm", async (t) => {
	const content = await compile("./index.mjs");

	t.assert.snapshot(content, {
		serializers: [(value) => value],
	});
});

test("webpack4 - BabelTransformPlugin: diff result", async (t) => {
	const original = await compile("./index.mjs", {
		plugins: [
			new BabelTransformPlugin({
				transformOptions: {
					plugins: [],
				},
			}),
		],
	});
	const transformed = await compile("./index.mjs", {
		plugins: [
			new BabelTransformPlugin({
				transformOptions: {
					plugins: [babelPluginTransformFsPromises],
				},
			}),
		],
	});

	const diffOutput = createTwoFilesPatch("bundled.js", "bundled.js", original, transformed, "", "");

	t.assert.snapshot(diffOutput, {
		serializers: [(value) => value],
	});
});
