"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/unist-util-remove-position";
exports.ids = ["vendor-chunks/unist-util-remove-position"];
exports.modules = {

/***/ "(ssr)/./node_modules/unist-util-remove-position/lib/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/unist-util-remove-position/lib/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   removePosition: () => (/* binding */ removePosition)\n/* harmony export */ });\n/* harmony import */ var unist_util_visit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! unist-util-visit */ \"(ssr)/./node_modules/unist-util-visit/lib/index.js\");\n/**\n * @typedef {import('unist').Node} Node\n */\n\n/**\n * @typedef Options\n *   Configuration.\n * @property {boolean | null | undefined} [force=false]\n *   Whether to use `delete` to remove `position` fields.\n *\n *   The default is to set them to `undefined`.\n */\n\n\n\n/**\n * Remove the `position` field from a tree.\n *\n * @param {Node} tree\n *   Tree to clean.\n * @param {Options | null | undefined} [options={force: false}]\n *   Configuration (default: `{force: false}`).\n * @returns {undefined}\n *   Nothing.\n */\nfunction removePosition(tree, options) {\n  const config = options || {}\n  const force = config.force || false\n\n  ;(0,unist_util_visit__WEBPACK_IMPORTED_MODULE_0__.visit)(tree, remove)\n\n  /**\n   * @param {Node} node\n   */\n  function remove(node) {\n    if (force) {\n      delete node.position\n    } else {\n      node.position = undefined\n    }\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvdW5pc3QtdXRpbC1yZW1vdmUtcG9zaXRpb24vbGliL2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQSxhQUFhLHNCQUFzQjtBQUNuQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLDRCQUE0QjtBQUMxQztBQUNBO0FBQ0E7QUFDQTs7QUFFc0M7O0FBRXRDO0FBQ0E7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQjtBQUNBLFdBQVcsNEJBQTRCLFVBQVUsYUFBYTtBQUM5RCwrQkFBK0IsYUFBYTtBQUM1QyxhQUFhO0FBQ2I7QUFDQTtBQUNPO0FBQ1A7QUFDQTs7QUFFQSxFQUFFLHdEQUFLOztBQUVQO0FBQ0EsYUFBYSxNQUFNO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2hhdGdwdC1saXRlLy4vbm9kZV9tb2R1bGVzL3VuaXN0LXV0aWwtcmVtb3ZlLXBvc2l0aW9uL2xpYi9pbmRleC5qcz9lZjFkIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQHR5cGVkZWYge2ltcG9ydCgndW5pc3QnKS5Ob2RlfSBOb2RlXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiBPcHRpb25zXG4gKiAgIENvbmZpZ3VyYXRpb24uXG4gKiBAcHJvcGVydHkge2Jvb2xlYW4gfCBudWxsIHwgdW5kZWZpbmVkfSBbZm9yY2U9ZmFsc2VdXG4gKiAgIFdoZXRoZXIgdG8gdXNlIGBkZWxldGVgIHRvIHJlbW92ZSBgcG9zaXRpb25gIGZpZWxkcy5cbiAqXG4gKiAgIFRoZSBkZWZhdWx0IGlzIHRvIHNldCB0aGVtIHRvIGB1bmRlZmluZWRgLlxuICovXG5cbmltcG9ydCB7dmlzaXR9IGZyb20gJ3VuaXN0LXV0aWwtdmlzaXQnXG5cbi8qKlxuICogUmVtb3ZlIHRoZSBgcG9zaXRpb25gIGZpZWxkIGZyb20gYSB0cmVlLlxuICpcbiAqIEBwYXJhbSB7Tm9kZX0gdHJlZVxuICogICBUcmVlIHRvIGNsZWFuLlxuICogQHBhcmFtIHtPcHRpb25zIHwgbnVsbCB8IHVuZGVmaW5lZH0gW29wdGlvbnM9e2ZvcmNlOiBmYWxzZX1dXG4gKiAgIENvbmZpZ3VyYXRpb24gKGRlZmF1bHQ6IGB7Zm9yY2U6IGZhbHNlfWApLlxuICogQHJldHVybnMge3VuZGVmaW5lZH1cbiAqICAgTm90aGluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZVBvc2l0aW9uKHRyZWUsIG9wdGlvbnMpIHtcbiAgY29uc3QgY29uZmlnID0gb3B0aW9ucyB8fCB7fVxuICBjb25zdCBmb3JjZSA9IGNvbmZpZy5mb3JjZSB8fCBmYWxzZVxuXG4gIHZpc2l0KHRyZWUsIHJlbW92ZSlcblxuICAvKipcbiAgICogQHBhcmFtIHtOb2RlfSBub2RlXG4gICAqL1xuICBmdW5jdGlvbiByZW1vdmUobm9kZSkge1xuICAgIGlmIChmb3JjZSkge1xuICAgICAgZGVsZXRlIG5vZGUucG9zaXRpb25cbiAgICB9IGVsc2Uge1xuICAgICAgbm9kZS5wb3NpdGlvbiA9IHVuZGVmaW5lZFxuICAgIH1cbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/unist-util-remove-position/lib/index.js\n");

/***/ })

};
;