var type = require('./type');

module.exports = {
  whilelist: function (obj, patterns) {
    let t = Object.prototype.toString.call(patterns)
    if (t !== '[object String]' && t !== '[object Array]') {
      throw 'patterns is not String or Array.(paramed: ' + t + ')'
    }
    
    if (t === '[object String]') {
      return _whitelistRecursive(obj, [patterns])
    }
  },
  filterNallow: function(obj, props) {
    var o = Array.isArray(obj) ? [] : {};
    for (var p of props) {
      if (obj[p] !== undefined) {
        o[p] = obj[p];
      }
    }
    return o
  }
};

function _whitelistRecursive(obj, patterns) {
  if (patterns.length === 0 || type.isPrimitive(obj)) {
    return undefined
  }

  let p = patterns[0];
  let o = Array.isArray(obj) ? [] : {};

  if (Array.isArray(obj)) {
    if (p === '*') {
      if (patterns.length === 1) {
        return obj;
      } else {
        let o = [];
        for (let i=0, len=obj.length; i<len; i++) {
          v = _whitelistRecursive(obj[i], patterns.slice(1))
          if (v !== undefined) {
            o[k] = v
          }
        }
        return o;
      }
    } else {
      let o = [];
      if (obj[p] !== undefined) {
        o[p] = patterns.length === 1 ? obj[p] : _whitelistRecursive(obj[p], patterns.slice(1))
      }
      return o;
    }
  } else {
    if (p === '*') {
      if (patterns.length === 1) {
        return obj;
      } else {
        let o = [];
        for (let k in obj) {
          v = _whitelistRecursive(obj, patterns.slice(1))
          if (v !== undefined) {
              o[k] = v
          }
        }
        return o;
      }
    } else {
      let o = [];
      if (obj[p] !== undefined) {
        o[p] = patterns.length === 1 ? obj[p] : _whitelistRecursive(obj[p], patterns.slice(1))
      }
      return o;
    }
  }

  if (p === '*') {
  } else {
    for (let k in type.keys(obj)) {
      if (!obj.hasOwnProperty(k)) {
        continue;
      }
      if (patterns.length === 1) {
        o[k] = obj[k]
      } else {
        v = _whitelistRecursive(obj, patterns.slice(1))
        if (v !== undefined) {
          o[k] = v
        }
      }
    }
  }
  return o
}