var knex = require('../config/database_mysql').knex;
var Bookshelf = require('bookshelf')(knex);
var Model = Bookshelf.Model.extend({
	tableName: 'emails',
	hasTimestamps: true,
	idAttribute: 'id',
	user: function () {
		var User = require('../../app/models/user_mod').Model;
		return this.hasOne(User);
	},
});
module.exports.Model = Model;
