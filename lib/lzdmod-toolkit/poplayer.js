'use strict';

exports.__esModule = true;
exports.display = display;
exports.close = close;
exports.increaseReadTimes = increaseReadTimes;
exports.navToUrl = navToUrl;

var _os = require('./os');

var _log = require('./log');

var _url = require('./url');

var _windvane = require('./windvane');

/** @module poplayer */
var WVPL = 'WVPopLayer';
var os = (0, _os.getOsSystem)();
var isInPopLayer = false;

/**
 * Display PopLayer
 */
function display() {
  return (0, _windvane.callWindVane)(WVPL, 'display', {}).then(function () {
    isInPopLayer = true;
    // TODO: log
  });
}

/**
 * Close PopLayer
 */
function close() {
  return (0, _windvane.callWindVane)(WVPL, 'close', {});
  // TODO: log when success
}

/**
 * Increase PopLayer counter
 * @since 5.0.6
 */
function increaseReadTimes() {
  return (0, _windvane.callWindVane)(WVPL, 'increaseReadTimes', {});
}

/**
 * Navigate to some web page by url
 * @param {string} url URL to go
 * @param {string} spmCD SPM-C.D
 */
function navToUrl(url, spmCD) {
  if (url.indexOf('spm=') < 0) {
    url = (0, _url.appendQuery)(url, {
      spm: (0, _log.getSPMAB)() + '.' + (spmCD || 'mmtk.0')
    });
  }
  return new Promise(function (resolve, reject) {
    if (isInPopLayer) {
      setTimeout(function () {
        window.WindVane.call(WVPL, 'navToUrl', { url: url }, function () {
          (0, _log.debugLog)(WVPL + '-navToUrl [success]: ' + url);
          close();
          resolve();
        }, function () {
          (0, _log.debugLog)(WVPL + '-navToUrl [failed]: ' + url);
          reject();
        });
      }, os.isIOS ? 300 : 0);
    } else {
      (0, _log.debugLog)('isInWeb location.href = ' + url);
      window.location.href = url;
      resolve('isInWeb');
    }
    // TODO: log
  });
}