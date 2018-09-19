var express = require('express');
var router = express.Router();

var config = require('config');
var request = require('request');

/* GET home page. */
router.all('/*', function(req, res, next) {
  let path = req.originalUrl.replace(new RegExp('^/api/'), '');

  let headers = {};
  headers['User-Agent'] = config.get('app-ua');
  headers = withContentType(headers, req);

  let reqOpt = {
    headers : headers,
    url : config.get('url_pass_api') + path,
  };
  reqOpt = withForm(reqOpt, req);

  request(reqOpt).pipe(res);
});

// with header
var withContentType = function(headers, req) {
  let contentType = req.get('Content-Type');
  if (contentType) {
    headers['Content-Type'] = contentType;
  }
  return headers;
}

// with request option

var withForm = function(reqOpt, req) {
  if (req.method === 'POST') {
    reqOpt.form = req.body;
  }
  return reqOpt;
} 

module.exports = router;
