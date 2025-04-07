import { defineConfig } from "@rslib/core";
import fs from "node:fs";
import path from "node:path";
import type { Compiler } from "@rspack/core";

class RspackDtsCopyPlugin {
	apply(compiler: Compiler) {
		const projectDir = __dirname;

		compiler.hooks.emit.tapPromise("RspackDtsCopyPlugin", async (compilation) => {
			const target = path.join(projectDir, "src/type.d.ts");

			compilation.emitAsset("esm/index.d.mts", new compiler.webpack.sources.RawSource(await fs.promises.readFile(target, "utf8")));

			compilation.emitAsset("cjs/index.d.ts", new compiler.webpack.sources.RawSource(await fs.promises.readFile(target, "utf8")));
		});
	}
}

export default defineConfig({
	source: {
		entry: {
			index: "src/index.ts",
		},
	},
	lib: [
		{
			format: "esm",
			syntax: "es5",
			output: {
				sourceMap: true,
				distPath: {
					js: "esm",
				},
			},
		},
		{
			format: "cjs",
			syntax: "es5",
			output: {
				sourceMap: true,
				distPath: {
					js: "cjs",
				},
			},
		},
	],
	output: {
		target: "node",
	},
	tools: {
		rspack: {
			plugins: [new RspackDtsCopyPlugin()],
		},
	},
});
