'use strict';

exports.__esModule = true;
exports.vibrate = vibrate;

var _log = require('./log');

/**
 * Vibrate
 * Refer to: https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API
 * @param {number|Array<number>} pattern An array of values describes alternating periods of time
 * in which the device is vibrating and not vibrating.
 */
function vibrate(pattern) {
  var ms = pattern instanceof Array ? pattern : [pattern];
  function webVibrate() {
    if (typeof navigator.vibrate === 'function') {
      navigator.vibrate(ms);
    }
  }
  if (window.WindVane && window.WindVane.isAvailable) {
    window.WindVane.call('LazVibratorWVPlugin', 'vibrate', { ms: ms }, function (e) {
      (0, _log.debugLog)('windvane vibrate success ' + JSON.stringify(e));
    }, function (e) {
      (0, _log.debugLog)('windvane vibrate failure ' + JSON.stringify(e) + ', try web vibrate.');
      webVibrate();
    });
  } else {
    webVibrate();
  }
} /** @module vibrate */
/* eslint import/prefer-default-export: 0 */