var fs = require("fs");
var plural = require("./plural");
function getidAttribute(table){
    for (var i=0;i<table.columns.length;i++){
        if(table.columns[i].COLUMN_KEY == 'PRI')
            return table.columns[i].COLUMN_NAME;
    } 
}
module.exports = {
    BuildModel: function(table) {
        return new Promise(function (resolve, reject) {
            var idAttribute = getidAttribute(table);
            /*
            if (typeof(idAttribute)=='undefined'){
                reject('Canot find idAttribute in table : ' + table.table_name)
            }
            */
            var txtfile = '';
            txtfile += "var knex = require('../config/database_mysql').knex;" + "\n";
            txtfile += "var Bookshelf = require('bookshelf')(knex);" + "\n";
            txtfile += "var Model = Bookshelf.Model.extend({" + "\n";
            txtfile += "\t" + "tableName: '" + table.table_name + "'," + "\n";
            txtfile += "\t" + "hasTimestamps: true," + "\n";
            txtfile += "\t" + "idAttribute: '" + idAttribute + "'," + "\n";
            if (table.columns.column_relation)
                txtfile += ",";
            for (var i=0;i<table.columns.length;i++){
                if (table.columns[i].COLUMN_KEY=='MUL') {
                    var related_table_name = plural.getSingular(table.columns[i].column_relation.REFERENCED_TABLE_NAME);
                    var relation_variable = related_table_name.charAt(0).toUpperCase() + related_table_name.substring(1,related_table_name.length)

                    txtfile += "\t" + related_table_name + ": function () {" + "\n";
                    txtfile += "\t\tvar " + relation_variable + " = require('../../app/models/" + related_table_name + "_mod').Model;" + "\n";
                    txtfile += "\t\treturn this.hasOne(" + relation_variable + ");" + "\n";
                    txtfile += "\t}";
                    if (i < table.columns.length - 1)
                        txtfile += ",";
                    txtfile += "\n";    
                }
            }
            /*
            country: function () {
                var Country = require('../../app/models/country_mod').Model;
        		return this.hasOne(Country);
        	},
            user: function () {
                var User = require('../../app/models/user_mod').Model;
        		return this.hasOne(User);
        	},
            groups: function () {
                var Groups = require('../../app/models/group_mod').Model;
            	return this.belongsToMany(Groups);
            },
            phones: function () {
                var Phones = require('../../app/models/phone_mod').Model;
            	return this.hasMany(Phones,'user_id');
            }
            */
            txtfile += "});" + "\n";
            txtfile += "module.exports.Model = Model;" + "\n";
            var file = "./app/models/" + plural.getSingular(table.table_name) + "_mod.js";
            fs.writeFile(file, txtfile,'utf8',(err) => {
                if(err) {
                    reject(err);
                    return;
                }
                resolve();
            });
            
        })
    }
}