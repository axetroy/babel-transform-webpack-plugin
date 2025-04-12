```diff
Index: bundled.js
===================================================================
--- bundled.js	
+++ bundled.js	
@@ -151,9 +151,9 @@
 
   /***/
 }), (/* 1 */
 /***/function (module, exports) {
-  module.exports = require("fs/promises");
+  module.exports = require("fs").promises;
 
   /***/
 }
 /******/)]);
\ No newline at end of file

```