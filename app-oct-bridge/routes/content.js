var express = require('express');
var router = express.Router();

var config = require('config');
var request = require('request');

/* download content */
router.all(new RegExp('/download/(.*)'), function(req, res, next) {
  let path = req.params[0];

  let headers = {};
  headers['User-Agent'] = config.get('app-ua');

  headers = withContentType(headers, req);

  let reqOpt = {
    headers : headers,
    url : config.get('url_pass_download') + path,
  };

  request(reqOpt).pipe(res)
});

// with header
var withContentType = function(headers, req) {
  let contentType = req.get('Content-Type');
  if (contentType) {
    headers['Content-Type'] = contentType;
  }
  return headers;
}

module.exports = router;
