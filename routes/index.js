var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config.json');
var format = require('../helper/format');
var Dishes = require('../models/dishSchema');
var fs = require('fs');
var path = require('path');


var imageFolderURL = "image/";
var imageExtension = ".png";

/* GET home page. */
router.get('/', function(req, res) {
	var headers = req.headers;
	var query = {
		'query': headers.query,
		'sort': headers.sort,
		'page': headers.page,
	};

	var numberOfDishServed = 5;

	// first way: get data from food2fork API
	request(format.formatSearchUrl(config.baseUrl, config.apiKey, query), 
		function(error, response, body) {
		// get a request from 
		if (!error && response.statusCode == 200) {
			var data = JSON.parse(body);
			res.json(data.recipes);
		}
	});
	
	// second way: get data from mongoose db
	// Dishes.find({})
	// .skip(headers.page * numberOfDishServed)
	// .limit(numberOfDishServed)
	// .exec(function (err, data) {
	// 	res.json(data);

	// 	data.forEach(function (element) {
	// 		savePicture(element);
	// 	});
	// });
});

function savePicture(recipe) {
	request(recipe.image_url)
	.pipe(fs.createWriteStream("./public/" + imageFolderURL + recipe.recipe_id + imageExtension));
}

router.get('/:id', function(req, res) {
	var id = '' + req.params.id;
	if (id) {
		Dishes.findOne({"recipe_id" : id})
		.exec(function(err, docs) {
			if (docs) {
				console.log('serve ingredients of dish id', id, 'to client');
				res.send(docs.ingredients);
			} else {
				request(format.formatGetUrl(config.baseUrl, config.apiKey, id), 
					function(error, response, body) {
					if (!error && response.statusCode == 200) {
						var data = JSON.parse(body);
						res.json(data.recipe.ingredients);
						var recipe = data.recipe;

						// save recipe
						savePicture(recipe);

						// change url of the image
						recipe.image_url = imageFolderURL + recipe.recipe_id + imageExtension;

						Dishes.create(recipe, function(err, dish) {
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
