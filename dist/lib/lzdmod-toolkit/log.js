'use strict';

exports.__esModule = true;
exports.OTHER = exports.SLD = exports.CLK = exports.EXP = exports.debugLog = undefined;
exports.setBaseParams = setBaseParams;
exports.log = log;
exports.setPageName = setPageName;
exports.report = report;
exports.getSPMAB = getSPMAB;

var _url = require('./url');

/**
 * log in debug
 * @function
 * @param {any} args anything to debug
 */
var debugLog = exports.debugLog = function () {
  if (window.vConsole) {
    return function () {
      var _console;

      var now = new Date();
      console.info(now.getMinutes() + ':' + now.getSeconds() + '.' + now.getMilliseconds());
      (_console = console).log.apply(_console, arguments);
    };
  } else if ((0, _url.getQuery)('debug')) {
    return function () {
      var _console2;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      (_console2 = console).log.apply(_console2, ['%c Debug ', 'background:#0b2;color:#fff;border-radius:4px'].concat(args));
    };
  }
  return function () {};
}();

// gmkeys
/** @module log */
/* eslint no-console: 0 */
var EXP = exports.EXP = 'EXP'; // => 2201
var CLK = exports.CLK = 'CLK'; // => 2101
var SLD = exports.SLD = 'SLD'; // => 19999
var OTHER = exports.OTHER = 'OTHER'; // => 19999

var BASE_LOG_PARAMS = {
  region: window.location.hostname.split('.').pop()
};

/**
 * Set base params for all goldlog
 * @param {string} key base-params key
 * @param {number|string} val base-params value
 */
function setBaseParams(key, val) {
  BASE_LOG_PARAMS[key] = val;
}

/**
 * Shortcut for goldlog
 * @param {string} logkey goldlog logkey, start with `/`
 * @param {String} gmkey goldlog gmkey
 * @param {object} params goldlog customizaion params
 * @param {string} [method=POST] goldlog request method
 */
function log(logkey, gmkey, params, method) {
  if (logkey.indexOf('/') !== 0) {
    logkey = '/' + logkey;
  }
  var kvs = Object.assign({}, BASE_LOG_PARAMS, params);
  if (window.goldlog) {
    var gokey = Object.keys(kvs).map(function (k) {
      return k + '=' + (typeof kvs[k] === 'string' ? kvs[k] : JSON.stringify(kvs[k]));
    }).join('&');
    window.goldlog.record(logkey, gmkey, gokey, method === 'GET' ? 'GET' : 'POST');
  } else {
    debugLog(logkey, gmkey, kvs);
  }
}

/**
 * set retcode page name
 * @param {*} name page name
 */
function setPageName() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : location.pathname || 'mm';

  if (!/-(m|pc|native)$/.test(name)) {
    name = name + '-m';
  }
  window.LZD_RETCODE_PAGENAME = name.replace(/\s/g, '_');
}
setPageName();

/**
 * report error to Retcode
 * https://lark.alipay.com/aone700692/tracking/scbww7
 * @param {Error} e Error
 * @param {object} options see https://lark.alipay.com/aone700692/tracking/scbww7#a433dr
 */
function report(e) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (window._blReport) {
    window._blReport('error', [e, options]);
  } else {
    console.log('%c Report ', 'background:#f00;color:#fff;border-radius:4px', e, options);
  }
}

function getMetaContent(id) {
  var metas = document.getElementsByTagName('meta');
  for (var i = 0; i < metas.length; i++) {
    if (metas[i].getAttribute('name') === id) {
      return metas[i].getAttribute('content');
    }
  }
  return '';
}

/**
 * Get page SPM A.B
 * @return {string} SPM-A.B
 */
function getSPMAB() {
  var spmAB = getMetaContent('spm-id');
  if (!spmAB) {
    var spmA = getMetaContent('data-spm');
    if (spmA) {
      spmAB = spmA + '.' + document.body.getAttribute('data-spm');
    }
  }
  return spmAB;
}