'use strict';

exports.__esModule = true;
exports.callWindVane = callWindVane;
/* eslint import/prefer-default-export: 0 */

function callWindVane() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return new Promise(function (resolve, reject) {
    if (window.WindVane && window.WindVane.isAvailable) {
      var _window$WindVane;

      (_window$WindVane = window.WindVane).call.apply(_window$WindVane, args.concat([resolve, reject]));
    } else {
      reject(new Error('WindVane is NOT available'));
    }
  });
}