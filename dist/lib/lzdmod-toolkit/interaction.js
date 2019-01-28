'use strict';

exports.__esModule = true;
exports.draw = draw;
exports.ctlTReady = ctlTReady;

var _index = require('@ali/lzdmod-mtop/index');

var _index2 = _interopRequireDefault(_index);

var _os = require('./os');

var _log = require('./log');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UMID_READY = 'UMID_READY'; /** @module interaction */

/* eslint import/prefer-default-export: 0 */


function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      (0, _log.debugLog)('delay > ', time);
      resolve(time);
    }, time || 0);
  });
}

/**
 * Lucky Draw
 * https://dip.alibaba-inc.com/pages/schemas/86207
 * @param {object} params Params
 * @param {number} params.activityId Activity ID
 * @return {Promise} resolve({ activityId, sessionId, leftTimes, won, benefits[] })
 */
function draw(_ref) {
  var _ref$activityCode = _ref.activityCode,
      activityCode = _ref$activityCode === undefined ? '' : _ref$activityCode,
      scene = _ref.scene,
      activityId = _ref.activityId;

  var dataObj = {};
  if (activityId) {
    dataObj = { activityId: activityId };
  } else {
    dataObj = {
      activityCode: activityCode,
      scene: scene
    };
  }
  return new Promise(function (resolve, reject) {
    var params = {
      api: 'mtop.lazada.interaction.prize.win',
      v: '1.0',
      data: dataObj,
      needLogin: true,
      ecode: 0,
      // type: 'GET',
      dataType: 'json'
      // timeout: 20000,
    };
    if ((0, _os.isNative)()) {
      params.WindVaneRequest = true;
      params.isSec = 1;
    }
    _index2.default.request(params, resolve, reject);
  });
}

function pureCTLReady() {
  return new Promise(function (resolve) {
    // same way to init clt like icms
    if (!window.Group_umid && window.ctl) {
      window.Group_umid = window.ctl.noConflict();
    }
    if (window.Group_umid) {
      window.Group_umid.ready(function () {
        (0, _log.debugLog)('> umid: ready');
        resolve(UMID_READY);
      });
    } else {
      (0, _log.report)('NO_GLOBAL_CTL');
      return delay(1000).then(resolve);
    }
  });
}

/**
 * A promise that if ctl(umid) is ready
 * @return {Promise} ctl is ready
 * @example
 * ctlTReady().then(draw).then((res) => {
 *   // ...
 * });
 */
function ctlTReady() {
  var delayTime = 4000;
  return Promise.race([delay(delayTime), pureCTLReady()]).then(function (res) {
    if (res !== UMID_READY) {
      (0, _log.report)('UMID_NOT_READY_IN_' + delayTime);
    }
    return res;
  });
}