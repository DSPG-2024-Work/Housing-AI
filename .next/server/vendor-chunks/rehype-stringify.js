"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/rehype-stringify";
exports.ids = ["vendor-chunks/rehype-stringify"];
exports.modules = {

/***/ "(ssr)/./node_modules/rehype-stringify/lib/index.js":
/*!****************************************************!*\
  !*** ./node_modules/rehype-stringify/lib/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ rehypeStringify)\n/* harmony export */ });\n/* harmony import */ var hast_util_to_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hast-util-to-html */ \"(ssr)/./node_modules/hast-util-to-html/lib/index.js\");\n/**\n * @typedef {import('hast').Root} Root\n * @typedef {import('hast-util-to-html').Options} Options\n * @typedef {import('unified').Compiler<Root, string>} Compiler\n */\n\n\n\n/**\n * Plugin to add support for serializing as HTML.\n *\n * @param {Options | null | undefined} [options]\n *   Configuration (optional).\n * @returns {undefined}\n *   Nothing.\n */\nfunction rehypeStringify(options) {\n  /** @type {import('unified').Processor<undefined, undefined, undefined, Root, string>} */\n  // @ts-expect-error: TS in JSDoc generates wrong types if `this` is typed regularly.\n  const self = this\n  const settings = {...self.data('settings'), ...options}\n\n  self.compiler = compiler\n\n  /**\n   * @type {Compiler}\n   */\n  function compiler(tree) {\n    return (0,hast_util_to_html__WEBPACK_IMPORTED_MODULE_0__.toHtml)(tree, settings)\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcmVoeXBlLXN0cmluZ2lmeS9saWIvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBLGFBQWEscUJBQXFCO0FBQ2xDLGFBQWEscUNBQXFDO0FBQ2xELGFBQWEsMENBQTBDO0FBQ3ZEOztBQUV3Qzs7QUFFeEM7QUFDQTtBQUNBO0FBQ0EsV0FBVyw0QkFBNEI7QUFDdkM7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNlO0FBQ2YsYUFBYSw0RUFBNEU7QUFDekY7QUFDQTtBQUNBLG9CQUFvQjs7QUFFcEI7O0FBRUE7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBLFdBQVcseURBQU07QUFDakI7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2NoYXRncHQtbGl0ZS8uL25vZGVfbW9kdWxlcy9yZWh5cGUtc3RyaW5naWZ5L2xpYi9pbmRleC5qcz9lYTE0Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQHR5cGVkZWYge2ltcG9ydCgnaGFzdCcpLlJvb3R9IFJvb3RcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ2hhc3QtdXRpbC10by1odG1sJykuT3B0aW9uc30gT3B0aW9uc1xuICogQHR5cGVkZWYge2ltcG9ydCgndW5pZmllZCcpLkNvbXBpbGVyPFJvb3QsIHN0cmluZz59IENvbXBpbGVyXG4gKi9cblxuaW1wb3J0IHt0b0h0bWx9IGZyb20gJ2hhc3QtdXRpbC10by1odG1sJ1xuXG4vKipcbiAqIFBsdWdpbiB0byBhZGQgc3VwcG9ydCBmb3Igc2VyaWFsaXppbmcgYXMgSFRNTC5cbiAqXG4gKiBAcGFyYW0ge09wdGlvbnMgfCBudWxsIHwgdW5kZWZpbmVkfSBbb3B0aW9uc11cbiAqICAgQ29uZmlndXJhdGlvbiAob3B0aW9uYWwpLlxuICogQHJldHVybnMge3VuZGVmaW5lZH1cbiAqICAgTm90aGluZy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVoeXBlU3RyaW5naWZ5KG9wdGlvbnMpIHtcbiAgLyoqIEB0eXBlIHtpbXBvcnQoJ3VuaWZpZWQnKS5Qcm9jZXNzb3I8dW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgUm9vdCwgc3RyaW5nPn0gKi9cbiAgLy8gQHRzLWV4cGVjdC1lcnJvcjogVFMgaW4gSlNEb2MgZ2VuZXJhdGVzIHdyb25nIHR5cGVzIGlmIGB0aGlzYCBpcyB0eXBlZCByZWd1bGFybHkuXG4gIGNvbnN0IHNlbGYgPSB0aGlzXG4gIGNvbnN0IHNldHRpbmdzID0gey4uLnNlbGYuZGF0YSgnc2V0dGluZ3MnKSwgLi4ub3B0aW9uc31cblxuICBzZWxmLmNvbXBpbGVyID0gY29tcGlsZXJcblxuICAvKipcbiAgICogQHR5cGUge0NvbXBpbGVyfVxuICAgKi9cbiAgZnVuY3Rpb24gY29tcGlsZXIodHJlZSkge1xuICAgIHJldHVybiB0b0h0bWwodHJlZSwgc2V0dGluZ3MpXG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/rehype-stringify/lib/index.js\n");

/***/ })

};
;