var fs = require("fs");
var plural = require("./plural");
module.exports = {
    BuildModel: function(table) {

        var txtfile = '';
        txtfile += "var knex = require('../config/database_mysql').knex;" + "\n";
        txtfile += "var Bookshelf = require('bookshelf')(knex);" + "\n";
        txtfile += "var Model = Bookshelf.Model.extend({" + "\n";
        txtfile += "\t" + "tableName: '" + table.table_name + "'," + "\n";
        txtfile += "\t" + "hasTimestamps: true," + "\n";
        txtfile += "\t" + "idAttribute: 'id'," + "\n";
        /*
        country: function () {
            var Country = require('../../app/models/country_mod').Model;
    		return this.hasOne(Country);
    	},
        user: function () {
            var User = require('../../app/models/user_mod').Model;
    		return this.hasOne(User);
    	}
        */
        txtfile += "});" + "\n";
        txtfile += "module.exports.Model = Model;" + "\n";
        var file = "./app/models/" + plural.getSingular(table.table_name) + "_mod.js";
        //fs.writeFileSync(file, txtfile,'utf8');
        
        console.log('file : \'' + table.table_name + '\' saved');
    }
}