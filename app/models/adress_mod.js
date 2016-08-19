var knex = require('../config/database_mysql').knex;
var Bookshelf = require('bookshelf')(knex);
var Model = Bookshelf.Model.extend({
	tableName: 'adresses',
	hasTimestamps: true,
	idAttribute: 'id',
	country: function () {
		var Country = require('../../app/models/country_mod').Model;
		return this.hasOne(Country);
	},
	user: function () {
		var User = require('../../app/models/user_mod').Model;
		return this.hasOne(User);
	},
});
module.exports.Model = Model;
