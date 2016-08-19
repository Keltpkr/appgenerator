var knex = require('../config/database_mysql').knex;
var Bookshelf = require('bookshelf')(knex);
var Model = Bookshelf.Model.extend({
	tableName: 'groups',
	hasTimestamps: true,
	idAttribute: 'id',
	users: function () {
		var Users = require('../../app/models/user_mod').Model;
		return this.belongsToMany(Users);
	},
});
module.exports.Model = Model;
