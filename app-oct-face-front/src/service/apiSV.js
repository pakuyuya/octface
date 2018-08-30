import config from '@/config/config'
import axios from 'axios'

import httputil from '@/jscode/httputil'

// テストできないつくりだがどうしよう

exports.default = {
  /**
   * get is function call RestAPI on server with GET request.
   * @param urlpath {string} part of url before API server url in config. If you specify a URL parameter like `/url/:id`, we will replace it with the contents of params
   * @param params {string} query parameter.
   */
  get: function (urlpath, params) {
    let apiurl = config.apiserver + (urlpath.startsWith('/') ? '' : '/') + urlpath
    let query = {};
    for (let v in params) {
      let prevurl = url
      url = url.replace(':' + v, params[v])

      if (prevurl === url) {
        query[v] = params[v];
      }
    }

    let qs = httputil.toQueryString(query)
    let fullurl = encodeURI(apiurl)
    if (qs !== '') {
      fullurl += '?' + qs
    }
 
    axios.get(fullurl)
  }
}
