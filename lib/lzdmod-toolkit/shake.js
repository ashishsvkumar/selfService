'use strict';

exports.__esModule = true;
exports.OFF = exports.ON = exports.LONG = exports.SHORT = undefined;
exports.openShakePlugin = openShakePlugin;
exports.abortShake = abortShake;
exports.addShakeStartListener = addShakeStartListener;
exports.addShakingListener = addShakingListener;
exports.addShakeEndListener = addShakeEndListener;
exports.setShakeReminder = setShakeReminder;

var _os = require('./os');

var WV_SHAKE_PLUGIN = 'LazShakeWVPlugin'; /** @module shake */
// https://lark.alipay.com/lzdmobile/lzd-interaction/owgql8

var SHORT = exports.SHORT = 'short';
var LONG = exports.LONG = 'long';
var ON = exports.ON = 'on';
var OFF = exports.OFF = 'off';

/**
 * Open Shake Plugin
 * (Start listen to the shake event)
 * @param {object} params Open shake-plugin params
 * @param {string} [params.type='short'] .LONG or .SHORT
 * @param {object} [params.vibrator='off'] vibrator when shake-end
 * @return {Promise} promise
 */
function openShakePlugin() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return new Promise(function (resolve, reject) {
    window.WindVane.call(WV_SHAKE_PLUGIN, 'open', params, resolve, reject);
  });
}

/**
 * Abort Current Shake Event
 * @return {Promise} promise
 */
function abortShake() {
  return new Promise(function (resolve, reject) {
    window.WindVane.call(WV_SHAKE_PLUGIN, 'abortShake', resolve, reject);
  });
}

/**
 * Bind callback when shakeEvent start
 * @param {function} fn Callback on shakeEvent start
 */
function addShakeStartListener(fn) {
  document.addEventListener('LazShake.Event.onShakeStart', fn);
}

/**
 * Bind callback when one shake movement finish
 * @param {function} fn Callback on shakeOnce
 */
function addShakingListener(fn) {
  document.addEventListener('LazShake.Event.onShakeOnce', fn);
}

/**
 * Bind callback when shakeEvent ended
 * @param {function} fn Callback on shakeEvent ended
 */
function addShakeEndListener(fn) {
  document.addEventListener('LazShake.Event.onShakeEnd', fn);
}

// Mock
// export function addShakeStartListener(fn) {
//   setTimeout(fn, 3000);
// }
// export function addShakingListener(fn) {
//   setTimeout(() => {
//     fn({
//       times: Math.floor(Math.random() * 5),
//     });
//   }, 3500);
//   setTimeout(() => {
//     fn({
//       times: Math.floor(Math.random() * 5),
//     });
//   }, 4000);
//   setTimeout(() => {
//     fn({
//       times: Math.floor(Math.random() * 5),
//     });
//   }, 4500);
// }
// export function addShakeEndListener(fn) {
//   setTimeout(fn, 5000);
// }


/**
 * Set ShakeReminder on iOS
 * @since 5.0.5
 */
function setShakeReminder() {
  if ((0, _os.getOsSystem)().isIOS) {
    return new Promise(function (resolve, reject) {
      window.WindVane.call('LAWVShakeReminderPlugin', 'openWithParams', {}, function () {
        window.addEventListener('beforeunload', function () {
          window.WindVane.call('LAWVShakeReminderPlugin', 'closeWithParams', {}, function () {}, function () {});
        });
        resolve();
      }, reject);
    });
  }
}