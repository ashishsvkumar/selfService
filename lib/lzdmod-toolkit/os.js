'use strict';

exports.__esModule = true;
exports.getOsSystem = getOsSystem;
exports.isNative = isNative;
exports.getBrowser = getBrowser;
/** @module os */

/**
 * Get Mobile OS System
 * @return {object} system object
 * @example
 * {
 *   name: 'Android/AndroidPad/Windows Phone/iPhone/iPad/iPod/unknown',
 *   version: 'string',
 *   isAndroid: boolean,
 *   isWindowsPhone: boolean,
 *   isIOS: boolean,
 *   isIPhone: boolean,
 *   isIPad: boolean,
 * }
 */
function getOsSystem() {
  var ua = window.navigator.userAgent;
  var matched = void 0;
  var os = {};
  /* eslint no-cond-assign: 0 */
  if (matched = ua.match(/Windows\sPhone\s(?:OS\s)?([\d.]+)/)) {
    os = {
      name: 'Windows Phone',
      isWindowsPhone: true,
      version: matched[1]
    };
  } else if (!!ua.match(/Safari/) && (matched = ua.match(/Android[\s/]([\d.]+)/))) {
    os = {
      version: matched[1]
    };

    if (ua.match(/Mobile\s+Safari/)) {
      os.name = 'Android';
      os.isAndroid = true;
    } else {
      os.name = 'AndroidPad';
      os.isAndroidPad = true;
    }
  } else if (matched = ua.match(/(iPhone|iPad|iPod)/)) {
    var name = matched[1];

    if (matched = ua.match(/OS ([\d_.]+) like Mac OS X/)) {
      os = {
        name: name,
        isIPhone: name === 'iPhone' || name === 'iPod',
        isIPad: name === 'iPad',
        isIOS: true,
        version: matched[1].split('_').join('.')
      };
    }
  }

  if (!os) {
    os = {
      name: 'unknown',
      version: '0.0.0'
    };
  }

  return os;
}

/**
 * If current device is Lazada App
 * @return {boolean} is Lazada App
 */
function isNative() {
  var UA = navigator && navigator.userAgent || '';
  var matchedAliApp = /AliApp/i.test(UA);
  if (matchedAliApp) {
    var appName = '';
    var matchResult = UA.match(/AliApp\(([a-z-A-Z]{1,20})\/(\d+(\.\d+){0,3})?\)/i);
    if (matchResult && matchResult.length >= 3) {
      appName = matchResult[1];
    }
    if (appName && (appName.toLowerCase() === 'la-android' || appName.toLowerCase() === 'la')) {
      return true;
    }
  } else {
    return false;
  }
}

/**
 * get browser info
 * @return {object}
 */
function getBrowser() {
  var ua = window.navigator.userAgent;
  var matched = void 0;
  var browser = {};
  if (matched = ua.match(/(?:UCWEB|UCBrowser\/)([d.]+)/)) {
    browser = {
      name: 'UC',
      isUC: true,
      version: matched[1]
    };
  } else if (matched = ua.match(/MQQBrowser\/([d.]+)/)) {
    browser = {
      name: 'QQ',
      isQQ: true,
      version: matched[1]
    };
  } else if (matched = ua.match(/(?:Firefox|FxiOS)\/([d.]+)/)) {
    browser = {
      name: 'Firefox',
      isFirefox: true,
      version: matched[1]
    };
  } else if ((matched = ua.match(/MSIE\s([d.]+)/)) || (matched = ua.match(/IEMobile\/([d.]+)/))) {
    browser = {
      version: matched[1]
    };

    if (ua.match(/IEMobile/)) {
      browser.name = 'IEMobile';
      browser.isIEMobile = true;
    } else {
      browser.name = 'IE';
      browser.isIE = true;
    }

    if (ua.match(/Android|iPhone/)) {
      browser.isIELikeWebkit = true;
    }
  } else if (matched = ua.match(/(?:Chrome|CriOS)\/([d.]+)/)) {
    browser = {
      name: 'Chrome',
      isChrome: true,
      version: matched[1]
    };

    if (matched = ua.match(/Opera|OPR\//)) {
      browser = {
        name: 'Opera',
        isOpera: true,
        version: matched[1]
      };
    }

    if (matched = ua.match(/SAMSUNG|Samsung|samsung/)) {
      browser.isSamsung = true;
    }

    if (ua.match(/Version\/[\d+.]+\s*Chrome/)) {
      browser.name = 'Chrome Webview';
      browser.isWebview = true;
    }
  } else if (!!ua.match(/Safari/) && (matched = ua.match(/Android[s/]([d.]+)/))) {
    browser = {
      name: 'Android',
      isAndroid: true,
      version: matched[1]
    };
  } else if (ua.match(/iPhone|iPad|iPod/)) {
    if (ua.match(/Safari/) && (matched = ua.match(/Version\/([d.]+)/))) {
      browser = {
        name: 'Safari',
        isSafari: true,
        version: matched[1]
      };
    } else if (matched = ua.match(/OS ([d_.]+) like Mac OS X/)) {
      browser = {
        name: 'iOS Webview',
        isWebview: true,
        version: matched[1].replace(/_/g, '.')
      };
    }
  }

  if (!browser) {
    browser = {
      name: 'unknown',
      version: '0.0.0'
    };
  }
  return browser;
}