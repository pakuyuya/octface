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

  request(reqOpt, (error, response, body) => {
    const h = response.headers;
    res.set({
      'content-disposition': h['content-disposition'],
      'date': h['date'],
      'content-type': h['content-type'],
      'content-length': h['content-length'],
      'cache-control': h['cache-control'],
      'access-control-allow-origin': h['access-control-allow-origin'],
      'strict-transport-security': h['strict-transport-security'],
      'x-frame-options': h['x-frame-options'],
      'x-content-type-options': h['x-content-type-options'],
      'x-xss-protection': h['x-xss-protection'],
      'referrer-policy': h['referrer-policy'],
      'content-security-policy': h['content-security-policy'],
      'x-runtime-rack': h['x-runtime-rack'],
      'vary': h['vary'],
      'x-github-request-id': h['x-github-request-id'],
    });
    res.send(body);
  });
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
