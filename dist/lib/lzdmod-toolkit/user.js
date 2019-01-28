'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /** @module user */


exports.getUserInfo = getUserInfo;
exports.loginWithNative = loginWithNative;
exports.loginWithH5 = loginWithH5;
exports.login = login;

var _index = require('@ali/lzdmod-common-info/index');

var _os = require('./os');

var _windvane = require('./windvane');

var _log = require('./log');

var _cookie = require('./cookie');

var _getEnv = (0, _index.getEnv)(),
    regionID = _getEnv.regionID;

var os = (0, _os.getOsSystem)();

var DOMAIN = {
  SG: 'https://member-m.lazada.sg/user/login?hybrid=1',
  MY: 'https://member-m.lazada.com.my/user/login?hybrid=1',
  PH: 'https://member-m.lazada.com.ph/user/login?hybrid=1',
  TH: 'https://member-m.lazada.co.th/user/login?hybrid=1',
  ID: 'https://member-m.lazada.co.id/user/login?hybrid=1',
  VN: 'https://member-m.lazada.vn/user/login?hybrid=1'
};

/**
 * Check if user is logined and get user info
 * reject if NOT login or NOT in App
 * @return {Promise} resolve({})
 */
function getUserInfo() {
  return (0, _windvane.callWindVane)('LAWVUserInfo', os.isIOS ? 'handlerUser' : 'getUserInfo', {}).then(function (res) {
    (0, _log.debugLog)('getUserInfo>', res);
    // ios isLogin === true; andriod isLogin === 'true'
    if (res.isLogin === true || res.isLogin === 'true') {
      return _extends({}, res, {
        uid: (0, _cookie.get)('lzd_uid') || ''
      });
    }
    var e = new Error('Not Login');
    e.$msg = res;
    throw e;
  });
}

/**
 * Login with Native using WindVane API
 * @return {Promise} promise
 */
function loginWithNative() {
  return (0, _windvane.callWindVane)('LAWVUserInfo', 'login', {});
}

/**
 * Login with H5 (jump to login page with backurl)
 * @param {string} [backurl=location.href] redirect url when loged in
 */
function loginWithH5(backurl) {
  window.location.href = DOMAIN[regionID] + '&redirect=' + encodeURIComponent(backurl || window.location.href);
}

/**
 * Login
 * @param {string} [backurl=location.href] redirect url when loged in
 */
function login(backurl) {
  if ((0, _os.isNative)()) {
    loginWithNative();
  } else {
    loginWithH5(backurl);
  }
}