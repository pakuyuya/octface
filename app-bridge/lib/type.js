module.exports = {
  isPrimitive: function (o) {
    var type = typeof arg
    return arg == null || (type != "object" && type != "function")
  },

  isArray: function (o) {
    return Array.isArray(o)
  },
  
  keys: function(o) {
    if (this.isArray(o)) {
      return Array.from({length: o.length}, (v, k) => k);
    } else {
      Object.keys(o)
    }
  }
};