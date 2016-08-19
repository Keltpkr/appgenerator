var plural = require("./plural");

module.exports = {
    BuildModel: function(table) {
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
        return txtfile;

    },
    BuilCollection: function(table){
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
        return txtfile;
    },
    BuildRoute: function(table){
        var Objname = table.table_name.charAt(0).toUpperCase() + plural.getSingular(table.table_name).substring(1,plural.getSingular(table.table_name).length);
        var txtfile = '';
        txtfile += "var isLoggedIn = require('../../app/libs/isloggedin.js');" + "\n";
        txtfile += "var " + table.table_name + "Controller = require('../controllers/" + table.table_name + "_con.js');" + "\n";
        txtfile += "\n";
        txtfile += "module.exports = function(app, passport) {" + "\n";
        txtfile += "\n";
        txtfile += "\tapp.get('/" + table.table_name + "', " + table.table_name + "Controller.get" + Objname + ");" + "\n";
        txtfile += "\tapp.get('/" + plural.getSingular(table.table_name) + "/:id', " + table.table_name + "Controller.get" + plural.getSingular(table.table_name) + ");" + "\n";
        txtfile += "\tapp.post('/" + plural.getSingular(table.table_name) + "_add', " + table.table_name + "Controller.add" + Objname + ");" + "\n";
        txtfile += "\tapp.get('/" + plural.getSingular(table.table_name) + "_del/:id', " + table.table_name + "Controller.del" + Objname + ");" + "\n";
        txtfile += "\tapp.post('/" + plural.getSingular(table.table_name) + "_update/:id', " + table.table_name + "Controller.update" + Objname + ");" + "\n";
        txtfile += "}" + "\n";
        return txtfile;
    },
    BuildController: function(table){
        var ObjnamePlur = table.table_name.charAt(0).toUpperCase() + table.table_name.substring(1,table.table_name.length);
        var ObjnameSing = table.table_name.charAt(0).toUpperCase() + plural.getSingular(table.table_name).substring(1,plural.getSingular(table.table_name).length);
        var txtfile = '';
        txtfile += "var " + ObjnamePlur + " = require('../collections/" + table.table_name + "_col').Collection;" + "\n";
        txtfile += "var " + ObjnameSing + " = require('../models/" + plural.getSingular(table.table_name) + "_mod').Model;" + "\n";
        txtfile += "" + "\n";
        txtfile += "module.exports = {" + "\n";
        txtfile += "	get" + ObjnameSing + ": function (req, res, next) {" + "\n";
        txtfile += "       " + ObjnameSing + ".forge({ " + getidAttribute(table) + ": req.params.id })" + "\n";
        txtfile += "		.fetch(" + buildwithRelated(table) + ")" + "\n";
        txtfile += "		.then(function (model) {" + "\n";
        txtfile += "		    res.json(model);" + "\n";
        txtfile += "		})" + "\n";
        txtfile += "		.catch(function (error) {" + "\n";
        txtfile += "			res.status(500).json({errormsg: error.message});" + "\n";
        txtfile += "		});" + "\n";
        txtfile += "	}," + "\n";
        txtfile += "   get" + ObjnamePlur + ": function (req, res, next) {" + "\n";
        txtfile += "        " + ObjnamePlur + ".forge()" + "\n";
        txtfile += "		.fetch(" + buildwithRelated(table) + ")" + "\n";
        txtfile += "		.then(function (model) {" + "\n";
        txtfile += "            res.json(model);" + "\n";
        txtfile += "		})" + "\n";
        txtfile += "		.catch(function (error) {" + "\n";
        txtfile += "			res.status(500).json({errormsg: error.message});" + "\n";
        txtfile += "		});" + "\n";
        txtfile += "	}," + "\n";
        txtfile += "   add" + ObjnameSing + ": function (req, res, next) {" + "\n";
        txtfile += "       " + ObjnameSing + ".forge(req.body)" + "\n";
        txtfile += "		.save()" + "\n";
        txtfile += "		.then(function (model) {" + "\n";
        txtfile += "           res.json(model);" + "\n";
        txtfile += "        })" + "\n";
        txtfile += "		.catch(function (error) {" + "\n";
        txtfile += "            res.status(500).json({errormsg: error.message});" + "\n";
        txtfile += "        });" + "\n";
        txtfile += "	}," + "\n";
        txtfile += "    del" + ObjnameSing + ": function (req, res, next) {" + "\n";
        txtfile += "        " + ObjnameSing + ".forge({ " + getidAttribute(table) + ": req.params.id })" + "\n";
        txtfile += "		.destroy()" + "\n";
        txtfile += "		.then(function (model) {" + "\n";
        txtfile += "          res.json([{" + getidAttribute(table) + ":req.params.id}]);" + "\n";
        txtfile += "        })" + "\n";
        txtfile += "		.catch(function (error) {" + "\n";
        txtfile += "            res.status(500).json({errormsg: error.message});" + "\n";
        txtfile += "         });" + "\n";
        txtfile += "	}," + "\n";
        txtfile += "    update" + ObjnameSing + ": function (req, res, next) {" + "\n";
        txtfile += "        " + ObjnameSing + ".forge({ " + getidAttribute(table) + ": req.params.id })" + "\n";
        txtfile += "		.save(req.body, { method: 'update' })" + "\n";
        txtfile += "		.then(function (model) {" + "\n";
        txtfile += "           res.json(model);" + "\n";
        txtfile += "        })" + "\n";
        txtfile += "		.catch(function (error) {" + "\n";
        txtfile += "            res.status(500).json({errormsg: error.message});" + "\n";
        txtfile += "       });" + "\n";
        txtfile += "	}," + "\n";
        txtfile += "}" + "\n";
        return txtfile;
    }
}
function getidAttribute(table){
    for (var i=0;i<table.columns.length;i++){
        if(table.columns[i].COLUMN_KEY == 'PRI')
            return table.columns[i].COLUMN_NAME;
    } 
}
function buildwithRelated(table){
    var txt ="{withRelated: [";
    for (var i=0;i<table.relations.length;i++){
        txt += "'" + table.relations[i].relatedtablename +"'";
        if(i<table.relations.length-1)
        txt += ","
    }
    txt += "], require: true}";
    return txt;
}