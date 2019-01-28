'use strict';

exports.__esModule = true;
exports.get = get;
exports.set = set;
exports.remove = remove;
/** @module cookie */

/**
 * get value from cookies by key
 * @since 5.0.5
 * @param {string} key the key of cookie, if not set, will return all the cookie
 * @return {string|object} value (return an object if key is not set)
 */
function get(key) {
  var result = key ? null : {};
  var cookies = document.cookie ? document.cookie.split('; ') : [];

  for (var i = 0; i < cookies.length; i++) {
    var parts = cookies[i].split('=');
    var cookie = parts.slice(1).join('=');
    var name = parts[0];

    if (key === name) {
      result = cookie;
      break;
    }
    if (!key) {
      result[name] = cookie;
    }
  }
  return result;
}

/**
 * set cookie
 * @since 5.0.5
 * @param {string} key cookie key
 * @param {string} value cookie value in string
 * @param {object} attributes cookie attributes
 * @param {number} attributes.expires expire time (ms)
 */
function set(key, value, attributes) {
  attributes = Object.assign({ path: '/' }, attributes);

  if (typeof attributes.expires === 'number') {
    var expires = new Date();
    expires.setTime(attributes.expires + expires.getTime());
    attributes.expires = expires;
  }
  // We're using "expires" because "max-age" is not supported by IE
  attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

  var stringifiedAttributes = '';
  for (var attributeName in attributes) {
    if (!attributes[attributeName]) {
      // eslint-disable-next-line
      continue;
    }
    stringifiedAttributes += '; ' + attributeName;
    if (attributes[attributeName] === true) {
      // eslint-disable-next-line
      continue;
    }
    stringifiedAttributes += '=' + attributes[attributeName];
  }
  return document.cookie = key + '=' + value + stringifiedAttributes;
}

/**
 * remove cookie
 * @since 5.0.5
 * @param {string} key cookie key
 * @param {object} attributes cookie attributes
 */
function remove(key, attributes) {
  set(key, '', Object.assign({}, attributes, { expires: -1 }));
}