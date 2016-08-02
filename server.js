var db = require('mysql-promise')();
var promise = require('promise');
var cnx = {
    connectionLimit : 100,
    host: process.env.ip,
    user: "keltpkr",
    password: "",
    database: 'jmf',
    charset: 'utf8'
}
var Tables = [];


db.configure(cnx);

function getTables() {
    var q = " SELECT";
    q = q + " table_name";
    q = q + " FROM ";
    q = q + " information_schema.tables"
    q = q + " WHERE"
    q = q + " table_schema='jmf'";
    q = q + " AND table_name NOT LIKE 'knex_%';";

    return db.query(q)
    .spread(function(rows){
        return rows;
    })
    .catch(function(err){
        return err;
    })
}
function getColumns(tables){
    var promises = new Array();
    for(var i=0; i<tables.length; i++){
        var q = " SELECT";
        q = q + " COLUMN_NAME,";
        q = q + " COLUMN_TYPE,";
        q = q + " COLUMN_KEY";
        q = q + " FROM";
        q = q + " INFORMATION_SCHEMA.COLUMNS";
        q = q + " WHERE";
        q = q + " TABLE_SCHEMA = 'jmf'";
        q = q + " AND TABLE_NAME = '" + tables[i].table_name + "';";

        var p = db.query(q)
        .spread(function(rows){
            return(rows);
        })
        promises.push(p);
    }
    return Promise.all(promises).then(function(values) {
        return values;
    })
}
function getForeignKey(tablename){
        var q = " SELECT";
        q = q + " COLUMN_NAME" ;
        q = q + " ,cu.TABLE_NAME";
        q = q + " ,cu.REFERENCED_TABLE_NAME";
        q = q + " ,cu.REFERENCED_COLUMN_NAME";
        q = q + " ,UPDATE_RULE";
        q = q + " ,DELETE_RULE";
        q = q + " FROM";
        q = q + " INFORMATION_SCHEMA.KEY_COLUMN_USAGE as cu";
        q = q + ",INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS as rc";
        q = q + " WHERE";
        q = q + " TABLE_SCHEMA = 'jmf'";
        q = q + " AND cu.TABLE_NAME = '" + tablename + "'";
        q = q + " AND cu.CONSTRAINT_NAME = rc.CONSTRAINT_NAME;";

        return  db.query(q)
                .spread(function(rows){
                    return(rows);
                })
}


getTables()
.then(function(tables) {
    if (process.argv[2]) {
        obj = {};
        obj.table_name = process.argv[2];
        tables = [obj];
    }
    for(var key in tables ){
        var obj = {"table_name":tables[key].table_name,"columns":[]};
        Tables.push(obj);
    }
    return getColumns(tables);
})
.then(function (columns) {
    for(var table=0;table<columns.length;table++){
        for(var col=0;col<columns[table].length;col++){
            var column = {'COLUMN_NAME':columns[table][col].COLUMN_NAME,'COLUMN_TYPE':columns[table][col].COLUMN_TYPE,'COLUMN_KEY':columns[table][col].COLUMN_KEY};
            Tables[table].columns.push(column);
        }
    }
})
.then(function () {
    var promises = new Array();
    for(var table=0;table<Tables.length;table++){
        var p = getForeignKey(Tables[table].table_name)
        .then(function (data) {
            return data;
        })
        promises.push(p);
    }
    return Promise.all(promises).then(function(values) {
        return values;
    })    
})
.then((function (data) {
    var search = require("./app/lib/ObjectSearch");
    for(var table_inc=0;table_inc<data.length;table_inc++){
        for(var col=0;col<data[table_inc].length;col++){
            var item = data[table_inc][col];
            var index = search.indexOf(Tables[table_inc].columns,item.COLUMN_NAME);
            Tables[table_inc].columns[index].column_relation=item;
        }
    }
}))
.then(function() {
    var gen = require("./app/lib/Generator");
    for(var table_inc=0;table_inc<Tables.length;table_inc++){
        gen.BuildModel(Tables[table_inc]);
    }    
     process.exit();
})
.catch(function(err) {
    console.log(err);
})
