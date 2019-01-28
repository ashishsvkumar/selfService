'use strict';

exports.__esModule = true;
exports.copyToClipboard = copyToClipboard;
/** @module Clipboard */
/* eslint import/prefer-default-export: 0 */

function select(element) {
  var selectedText = void 0;

  if (element.nodeName === 'SELECT') {
    element.focus();

    selectedText = element.value;
  } else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
    var isReadOnly = element.hasAttribute('readonly');

    if (!isReadOnly) {
      element.setAttribute('readonly', '');
    }

    element.select();
    element.setSelectionRange(0, element.value.length);

    if (!isReadOnly) {
      element.removeAttribute('readonly');
    }

    selectedText = element.value;
  } else {
    if (element.hasAttribute('contenteditable')) {
      element.focus();
    }

    var selection = window.getSelection();
    var range = document.createRange();

    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);

    selectedText = selection.toString();
  }

  return selectedText;
}

/**
 * copy value to clipboard
 * @since 5.0.4
 * @param {string} value value to be copyed
 * @param {Function} callback callback after tryed to copy
 */
function copyToClipboard(value, callback) {
  if (!value) {
    return;
  }
  var el = document.createElement('textarea');
  el.textContent = value;
  el.style.position = 'fixed';
  el.style.top = '-100px';
  el.style.left = '0px';
  document.body.appendChild(el);

  var selectedText = select(el);
  if (document.queryCommandSupported('copy')) {
    var successful = document.execCommand('copy');
    if (successful) {
      callback(selectedText);
    }
  } else if (!navigator.userAgent.match(/ipad|ipod|iphone|android|silk/i)) {
    callback(selectedText);
  }

  document.body.removeChild(el);
}