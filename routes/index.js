var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config.json');
var format = require('../helper/format');
var Dishes = require('../models/dishSchema');

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
	var id = '' + req.params.id;
	Dishes.find({"recipe_id" : id}).exec(function(err, docs) {
		if (docs.length != 0) {
			console.log(docs);
			res.send(docs);
		} else {
			request(format.formatGetUrl(config.baseUrl, config.apiKey, id), 
				function(error, response, body) {
				// get a request from 
				if (!error && response.statusCode == 200) {
					var data = JSON.parse(body);
					res.json(data.recipe);

					Dishes.create(data.recipe, function(err, dish) {
						if (err) throw err;

						console.log('Dish created');
						console.log(dish);
					});
				}
			});
		}
	});
});

module.exports = router;
