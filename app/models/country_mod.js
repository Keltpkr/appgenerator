var knex = require('../config/database_mysql').knex;
var Bookshelf = require('bookshelf')(knex);
var Model = Bookshelf.Model.extend({
	tableName: 'countries',
	hasTimestamps: true,
	idAttribute: 'id',
	adresses: function () {
		var Adresses = require('../../app/models/adress_mod').Model;
		return this.hasMany(Adresses);
	},
	users: function () {
		var Users = require('../../app/models/user_mod').Model;
		return this.hasMany(Users);
	},
});
module.exports.Model = Model;
