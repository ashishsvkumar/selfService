"use strict";

exports.__esModule = true;
exports.load = load;
/** @module image */
/* eslint import/prefer-default-export: 0 */

function loadOneImage(src) {
  return new Promise(function (resolve) {
    var img = new Image();
    img.onload = resolve;
    img.src = src;
    return src;
  });
}

/**
 * load images in background
 * @param {Array<string>|string} src image url string or array of string
 * @return {Promise} done
 */
function load(src) {
  var srcArr = src instanceof Array ? src : [src];
  return Promise.all(srcArr.map(function (s) {
    return loadOneImage(s);
  }));
}