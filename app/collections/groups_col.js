var knex = require('../config/database_mysql').knex;
var Bookshelf = require('bookshelf')(knex);

//require the model for this collection
var Model = require('../models/group_mod').Model;

var Collection = Bookshelf.Collection.extend({
	model: Model
});
module.exports.Collection = Collection;
