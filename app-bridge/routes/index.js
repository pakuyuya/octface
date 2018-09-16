var express = require('express');
var router = express.Router();

var config = require('config');
var request = require('request');

var apiRouter = require('./api');
var contentRouter = require('./content');

/* GET home page. */
router.use('/api', apiRouter);
router.use('/content', contentRouter);

module.exports = router;
