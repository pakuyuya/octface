import cfg from '@/config/config'
import axios from 'axios'

import httputil from '@/jscode/httputil'

// テストできないつくりだがどうしよう

export default {
  /**
   * get is function call RestAPI on server with GET request.
   * @param urlpath {string} part of url before API server url in config. If you specify a URL parameter like `/url/:id`, we will replace it with the contents of params
   * @param params {string} query parameter.
   */
  get: function (urlpath, params) {
    let apiurl = cfg.default.apiserver + (urlpath.startsWith('/') ? '' : '/') + urlpath
    let query = {}
    for (let v in params) {
      let prevurl = apiurl
      apiurl = apiurl.replace(':' + v, params[v])

      if (prevurl === apiurl) {
        query[v] = params[v]
      }
    }

    let qs = httputil.toQueryString(query)
    let fullurl = encodeURI(apiurl)
    if (qs !== '') {
      fullurl += '?' + qs
    }

    let axiosCfg = {
      responseType: 'json'
    }

    return axios.get(fullurl, axiosCfg)
  }
}
