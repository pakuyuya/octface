
export default {

    // object to http query string
    toQueryString: function(obj) {
        const ks = obj.keys()
        const vs = obj.values()

        return ks.map((k, i) => encodeURI(k) + '=' + eoncodeURI(vs[i])).join('&')
    }
}