# babel-transform-webpack-plugin

[![Badge](https://img.shields.io/badge/link-996.icu-%23FF4D5B.svg?style=flat-square)](https://996.icu/#/en_US)
[![LICENSE](https://img.shields.io/badge/license-Anti%20996-blue.svg?style=flat-square)](https://github.com/996icu/996.ICU/blob/master/LICENSE)
![Node](https://img.shields.io/badge/node-%3E=14-blue.svg?style=flat-square)
[![npm version](https://badge.fury.io/js/babel-transform-webpack-plugin.svg)](https://badge.fury.io/js/babel-transform-webpack-plugin)

A Webpack plugin to transform javascript chunk with `Babel@7` and it compatible with `webpack@5` and `webpack@4`.

## What is different with `babel-loader`?

-   `babel-loader` is a loader, it will transform the file before it is passed to the next loader.
-   `babel-transform-webpack-plugin` is a plugin, it will transform the javascript chunk that is bundled by the webpack.

## Should I use it?

If you want to transform the javascript chunk after it is bundled by the webpack, you can use this plugin.

eg. you want to use `babel-plugin-transform-fs-promises` to transform the final javascript chunk to use `require('fs').promises` instead of `require('fs/promises')` in the final bundle.

## Installation

```bash
npm install babel-transform-webpack-plugin --save
```

## Usage

```js
// import via esm
import { BabelTransformPlugin } from "babel-transform-webpack-plugin";

// import via cjs
const { BabelTransformPlugin } = require("babel-transform-webpack-plugin");
```

```js
const { BabelTransformPlugin } = require("babel-transform-webpack-plugin");

/** @type {import('webpack').Configuration} */
module.exports = {
    plugins: [
        // only use babel-transform-webpack-plugin in production for better performance
        // you can use it in development if you want to debug the code
        // but it will slow down the build process
        process.env.NODE_ENV === "production"
            ? new BabelTransformPlugin({
                  transformOptions: {
                      plugins: [
                          // your babel plugins
                      ],
                  },
              })
            : undefined,
        // ... other plugins
    ].filter(Boolean),
};
```

## License

The [Anti 996 License](LICENSE)
