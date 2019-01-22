"use strict";

exports.__esModule = true;
exports.vw = vw;
/** @module style */
/* eslint import/prefer-default-export: 0 */

/**
 * px to vw (base on 750px-width UI design)
 * @since 5.0.6
 * @param {number} n px value;
 * @returns {string} vw value like `100vw`
 * @example
 * vw(750); // '100vw'
 */
function vw(n) {
  return n / 7.5 + "vw";
}