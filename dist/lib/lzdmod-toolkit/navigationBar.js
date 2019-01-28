'use strict';

exports.__esModule = true;
exports.hide = hide;

var _os = require('./os');

var os = (0, _os.getOsSystem)(); /** @module navigationBar */

function hide() {
  if (os.isIOS) {
    window.WindVane.call('LANavigationBar', 'setNaviBarHidden', {
      hidden: '1'
    }, function (e) {
      console.log('setNaviBarHidden success: ', e);
    }, function (e) {
      console.error('setNaviBarHidden failed: ' + JSON.stringify(e));
    });
  } else {
    window.WindVane.call('LANavigationBar', 'setMenu', 'false', function (e) {
      console.log('setMenu success: ', e);
    }, function (e) {
      console.error('setMenu failed: ' + JSON.stringify(e));
    });
  }
}

exports.default = {
  hide: hide
};