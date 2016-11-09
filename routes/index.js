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
		var data = JSON.parse(body);
		if (!error && response.statusCode == 200 && !data.error) {
			// console.log(body)
			// var data = JSON.parse(body);
			res.json(data);
		} else {
			Dishes.find({}).lean().limit(10).exec(function (err, data) {
				res.json(data);
			})
		}
	});
});

router.get('/:id', function(req, res) {
	var id = '' + req.params.id;
	if (id) {
		Dishes.findOne({"recipe_id" : id})
		.exec(function(err, docs) {
			if (docs) {
				console.log('serve dish id', id, 'to client');
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

							console.log('Dish created with id', dish.recipe_id);
						});
					}
				});
			}
		});
	}
});

module.exports = router;
