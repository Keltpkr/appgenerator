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

            var txtfile = '';
            txtfile += "var knex = require('../config/database_mysql').knex;" + "\n";
            txtfile += "var Bookshelf = require('bookshelf')(knex);" + "\n";
            txtfile += "var Model = Bookshelf.Model.extend({" + "\n";
            txtfile += "\t" + "tableName: '" + table.table_name + "'," + "\n";
            txtfile += "\t" + "hasTimestamps: true," + "\n";
            txtfile += "\t" + "idAttribute: '" + idAttribute + "'" + "";
            if (table.relations.length > 0)
                txtfile += ",\n";
            for (var i=0;i<table.relations.length;i++){
                var mod = plural.getSingular(table.relations[i].relatedtablename);
                if (table.relations[i].type == 'hasOne')
                    var related_table_name = plural.getSingular(table.relations[i].relatedtablename);
                else
                    var related_table_name = table.relations[i].relatedtablename;

                var relation_variable = related_table_name.charAt(0).toUpperCase() + related_table_name.substring(1,related_table_name.length)

                txtfile += "\t" + related_table_name + ": function () {" + "\n";
                txtfile += "\t\tvar " + relation_variable + " = require('../../app/models/" + mod + "_mod').Model;" + "\n";
                txtfile += "\t\treturn this."+ table.relations[i].type + "(" + relation_variable + ");" + "\n";
                txtfile += "\t}";
                if (i < table.columns.length - 1)
                    txtfile += ",";
                txtfile += "\n";    
            }
            txtfile += "});" + "\n";
            txtfile += "module.exports.Model = Model;" + "\n";
            var file = "./app/models/" + plural.getSingular(table.table_name) + "_mod.js";
            fs.writeFile(file, txtfile,'utf8',(err) => {
                if(err) {
                    reject(err);
                }
                resolve();
            });
            
        })
    },
    BuilCollections: function(table){
        return new Promise(function (resolve, reject) {
            var txtfile = '';
            txtfile += "var knex = require('../config/database_mysql').knex;" + "\n";
            txtfile += "var Bookshelf = require('bookshelf')(knex);" + "\n";
            txtfile += "\n";
            txtfile += "//require the model for this collection" + "\n";
            txtfile += "var Model = require('../models/"  + plural.getSingular(table.table_name) + "_mod').Model;" + "\n";
            txtfile += "\n";
            txtfile += "var Collection = Bookshelf.Collection.extend({" + "\n";
            txtfile += "\tmodel: Model" + "\n";
            txtfile += "});" + "\n";
            txtfile += "module.exports.Collection = Collection;" + "\n";
            
            var file = "./app/collections/" + table.table_name + "_col.js";
            fs.writeFile(file, txtfile,'utf8',(err) => {
                if(err) {
                    reject(err);
                }
                resolve();
            });
        })
    },
    BuildRoute: function(table){
        return new Promise(function (resolve, reject) {
            var txtfile = '';
            var file = "./app/routes/" + plural.getSingular(table.table_name) + "_rou.js";
            fs.writeFile(file, txtfile,'utf8',(err) => {
                if(err) {
                    reject(err);
                }
                resolve();
            });
        })
    },
    BuildController: function(table){
        return new Promise(function (resolve, reject) {
            var txtfile = '';
            var file = "./app/controllers/" + plural.getSingular(table.table_name) + "_con.js";
            fs.writeFile(file, txtfile,'utf8',(err) => {
                if(err) {
                    reject(err);
                }
                resolve();
            });
        })        
    }
}