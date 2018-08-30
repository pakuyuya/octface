
export default {
  // object to http query string
  toQueryString: function (obj) {
    const ks = Object.keys(obj)
    const vs = Object.values(obj)

    return ks.map((k, i) => encodeURI(k) + '=' + encodeURI(vs[i])).join('&')
  }
}
