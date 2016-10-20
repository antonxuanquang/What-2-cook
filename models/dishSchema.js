var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dishSchema = new Schema({
	publisher: {
		type: String,
		require: true,
	},
	f2f_url: {
		type: String,
		require: true,
	},
	ingredients: {
		type: [String],
		require: true,
	},
	source_url: {
		type: String,
		require: true,
	},
	recipe_id: {
		type: String,
		require: true,
		unique: true,
	},
	image_url: {
		type: String,
		require: true,
	},
	social_rank: {
		type: Number,
		require: true,
	},
	publisher_url: {
		type: String,
		require: true,
	},
	title: {
		type: String,
		require: true,
	},
}, {
	timestamps: true
});

var Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes;