```diff
Index: bundled.js
===================================================================
--- bundled.js	
+++ bundled.js	
@@ -7,9 +7,9 @@
   var __webpack_modules__ = [
     /* 0 */
   , (/* 1 */
   /***/module => {
-    module.exports = require("fs/promises");
+    module.exports = require("fs").promises;
 
     /***/
   }
   /******/)];

```