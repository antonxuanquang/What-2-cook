var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config.json');
var format = require('../helper/format');

/* GET home page. */
router.get('/', function(req, res) {
	var headers = req.headers;
	var query = {
		'query': headers.query,
		'sort': headers.sort,
		'page': headers.page,
	};
	request(format.formatSearchUrl(config.baseUrl, config.apiKey, query), 
		function(error, response, body) {
		// get a request from 
		if (!error && response.statusCode == 200) {
			var data = JSON.parse(body);
			res.json(data);
		}
	});
});

router.get('/:id', function(req, res) {
	request(format.formatGetUrl(config.baseUrl, config.apiKey, req.params.id), 
		function(error, response, body) {
		// get a request from 
		if (!error && response.statusCode == 200) {
			var data = JSON.parse(body);
			res.json(data);
		}
	});
});

module.exports = router;
