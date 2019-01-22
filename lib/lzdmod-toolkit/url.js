'use strict';

exports.__esModule = true;
exports.getQuery = getQuery;
exports.getQueryFromPopLayerHash = getQueryFromPopLayerHash;
exports.appendQuery = appendQuery;
/** @module url */

/**
 * get query param from url
 * @param {string} key - query key
 * @param {string} [url=location.search] - url, default to location.search
 * @return {string} query param value
 */
function getQuery(key, url) {
  url = url || window.location.search;
  var hashIndex = url.indexOf('#');
  if (hashIndex > 0) {
    url = url.substr(0, hashIndex);
  }

  var keyMatches = url.match(new RegExp('[?|&]' + encodeURIComponent(key) + '=([^&]*)(&|$)'));
  if (keyMatches && keyMatches[1] === '%s') {
    return keyMatches[1];
  }
  return keyMatches ? decodeURIComponent(keyMatches[1]) : '';
}

/**
 * get query param from PopLayer #Hash
 * @param {string} key - query key
 * @param {string} [hash=location.hash] - hash, default to location.hash
 * @return {string} query param value
 */
function getQueryFromPopLayerHash(key, hash) {
  hash = (hash || window.location.hash).replace(/^#/, '?');
  return getQuery(key, decodeURIComponent(hash));
}

/**
 * append query to url
 * @param {url} url origin url
 * @param {object} kv a flaten K-V object containing query key-value pairs
 */
function appendQuery(url, kv) {
  var str = Object.keys(kv).map(function (k) {
    return k + '=' + encodeURIComponent(kv[k]);
  }).join('&');
  return '' + url + (url.indexOf('?') < 0 ? '?' : '&') + str;
}