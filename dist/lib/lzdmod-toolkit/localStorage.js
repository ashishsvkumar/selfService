'use strict';

exports.__esModule = true;
exports.get = get;
exports.set = set;

var _log = require('./log');

/**
 * get value from LS by key
 * @since 5.0.5
 * @param {string} key - key
 * @return {any} value
 */
function get(key) {
  try {
    return JSON.parse(window.localStorage.getItem(key));
  } catch (e) {
    (0, _log.debugLog)('LS.get', e);
    return undefined;
  }
}

/**
 * set value to LS by key
 * @since 5.0.5
 * @param {string} key - query key
 * @param {any} value - value to set
 */
/** @module localStorage */

function set(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}