### Input

```js
/* eslint-disable unicorn/prefer-node-protocol */
// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
const fs = require("fs/promises");

console.log(fs);

```

### Output

```js
/******/(() => {
  // webpackBootstrap
  /******/
  var __webpack_modules__ = [
    /* 0 */
  , (/* 1 */
  /***/module => {
    "use strict";

    module.exports = require("fs/promises");

    /***/
  }
  /******/)];
  /************************************************************************/
  /******/ // The module cache
  /******/
  var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/
  function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/var cachedModule = __webpack_module_cache__[moduleId];
    /******/
    if (cachedModule !== undefined) {
      /******/return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/
    var module = __webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/exports: {}
      /******/
    };
    /******/
    /******/ // Execute the module function
    /******/
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    /******/
    /******/ // Return the exports of the module
    /******/
    return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  // This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
  (() => {
    /* eslint-disable unicorn/prefer-node-protocol */
    // biome-ignore lint/style/useNodejsImportProtocol: <explanation>
    const fs = __webpack_require__(1);
    console.log(fs);
  })();

  /******/
})();
```