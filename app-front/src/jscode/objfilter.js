import type from 'type'

export default {
  whilelist: function (obj, patterns) {
    let t = Object.prototype.toString.call(patterns)
    if (t !== '[object String]' && t !== '[object Array]') {
      throw 'patterns is not String or Array.(paramed: ' + t + ')'
    }
    
    if (t === '[object String]') {
      return _whitelistRecursive(obj, [patterns])
    }
  }
}

function _whitelistRecursive(obj, patterns) {
  if (patterns.length === 0 || type.isPrimitive(obj)) {
    return undefined
  }

  let p = patterns[0]
  let o = (Object.prototype.toString.call(obj) === '[object Array]') ? [] : {}
  if (p === '*') {
    if (patterns.length === 1) {
      o = Object.assign(o, obj)
    } else {

      for (let k in obj) {
        v = _whitelistRecursive(obj, patterns.slice(1))
        if (v !== undefined) {
            o[k] = v
        }
      }
    }
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