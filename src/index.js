const cookieSessionStorage = {
  setItem (key = '', value = '') {
    document.cookie = `${key}=${value}; path=/`
  },

  getItem (key) {
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

  removeItem (key) {
    document.cookie = `${key}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`
  },

  clear () {
    this.keys().forEach(key => this.removeItem(key))
  },

  keys () {
    // Adapted from: https://developer.mozilla.org/en-US/docs/Web/API/document/cookie
    const keys = document.cookie
      .replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '')
      .split(/\s*(?:\=[^;]*)?;\s*/)
    for (let len = keys.length, index = 0; index < len; index++) {
      keys[index] = decodeURIComponent(keys[index])
    }
    return keys
  }
}

export default cookieSessionStorage
