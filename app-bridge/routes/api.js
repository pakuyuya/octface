var express = require('express');
var router = express.Router();

var config = require('config');
var request = require('request');

var objfilter = require('../lib/objfilter');

var remoteCallGenerator = (genurl, genResponse) => function(req, res, next) {
  let path = genurl(req, res);

  let headers = {};
  headers['User-Agent'] = config.get('app-ua');
  headers = withContentType(headers, req);

  let reqOpt = {
    headers : headers,
    url : config.get('url_pass_api') + path,
  };
  reqOpt = withForm(reqOpt, req);

  request(reqOpt, (error, response, body) => {
    let h = response.headers;
    res.set({
      'access-control-allow-origin': h['access-control-allow-origin']
    });
    let originData = JSON.parse(body);
    
    let resData = genResponse(res, originData)
    
    res.json(resData);
  });
};


router.all('/search/repositories',
  remoteCallGenerator(req => req.originalUrl.replace(new RegExp('^/api/'), ''),
  (req, originData) => ({
    total_count: originData.total_count,
    items: originData.items.map(v => ({
      id: v.id,
      full_name: v.full_name,
      owner: {login: v.owner.login},
      name: v.name,
      description: v.description
    }))
  }))
);

router.all('/repos/:owner/:repos/tags',
  remoteCallGenerator(req => req.originalUrl.replace(new RegExp('^/api/'), ''),
  (req, originData) => (
    originData.map(v => ({
      id: v.id,
      name: v.name,
    }))
  ))
);

router.all('/repos/:owner/:repos/contents/*', remoteCallGenerator(req => req.originalUrl.replace(new RegExp('^/api/'), ''),
(req, originData) => (
  originData.map(v => ({
    node_id: v.node_id,
    type: v.type,
    name: v.name,
    path: v.path
  }))
)));

router.all('/*', 
  remoteCallGenerator(req => req.originalUrl.replace(new RegExp('^/api/'), ''),
  (req, originData) => originData
  )
);

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
