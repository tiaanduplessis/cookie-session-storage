(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.cookieSessionStorage = factory());
}(this, (function () { 'use strict';

var cookieSessionStorage = {
  setItem: function setItem (key, value) {
    if ( key === void 0 ) key = '';
    if ( value === void 0 ) value = '';

    document.cookie = key + "=" + value + "; path=/";
  },

  getItem: function getItem (key) {
    // Adapted from: https://developer.mozilla.org/en-US/docs/Web/API/document/cookie
    if (!key) {
      return null
    }

    return (
      decodeURIComponent(
        document.cookie.replace(
          new RegExp(
            '(?:(?:^|.*;)\\s*' +
              encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') +
              '\\s*\\=\\s*([^;]*).*$)|^.*$'
          ),
          '$1'
        )
      ) || null
    )
  },

  removeItem: function removeItem (key) {
    document.cookie = key + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  },

  clear: function clear () {
    var this$1 = this;

    this.keys().forEach(function (key) { return this$1.removeItem(key); });
  },

  keys: function keys () {
    // Adapted from: https://developer.mozilla.org/en-US/docs/Web/API/document/cookie
    var keys = document.cookie
      .replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '')
      .split(/\s*(?:\=[^;]*)?;\s*/);
    for (var len = keys.length, index = 0; index < len; index++) {
      keys[index] = decodeURIComponent(keys[index]);
    }
    return keys
  }
};

return cookieSessionStorage;

})));
