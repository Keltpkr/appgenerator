var is = require("./isAssociative");
var search = require("./ObjectSearch");

module.exports = {
    SetRelations: function(tables) {
        // check relations
        for (var t_inc=0;t_inc<tables.length;t_inc++){
            // Detect if associative table
            if (is.isAssociativeTable(tables,tables[t_inc])){
                var u_pos = tables[t_inc].table_name.indexOf('_');
                var tableR = [];
                tableR[1] =  tables[t_inc].table_name.substring(0,u_pos);
                tableR[0] =  tables[t_inc].table_name.substring(u_pos+1,tables[t_inc].table_name.length);
                var flag = 0;
                for (var c_inc=0;c_inc<tables[t_inc].columns.length;c_inc++){
                     if (tables[t_inc].columns[c_inc].COLUMN_KEY=='MUL') {
                        var relation = {};
                        relation.type = 'belongsToMany';
                        relation.relatedtablename = tableR[flag];
                        relation.relatedcollumnname = tables[t_inc].columns[c_inc].COLUMN_NAME;
                        setRelation(tables,tables[search.findIndex(tables,tables[t_inc].columns[c_inc].column_relation.REFERENCED_TABLE_NAME)],relation)
                        flag++;
                    }                   
                }
            } else {
                for (var c_inc=0;c_inc<tables[t_inc].columns.length;c_inc++){
                    // Check if column has relation
                    if (tables[t_inc].columns[c_inc].COLUMN_KEY=='MUL') {
                        var relation = {};
                        relation.type = 'hasOne';
                        relation.relatedtablename = tables[t_inc].columns[c_inc].column_relation.REFERENCED_TABLE_NAME;
                        relation.relatedcollumnname = tables[t_inc].columns[c_inc].column_relation.REFERENCED_COLUMN_NAME;
                        setRelation(tables,tables[t_inc],relation)

                        var relation = {};
                        relation.type = 'hasMany';
                        relation.relatedtablename = tables[t_inc].table_name;
                        relation.relatedcollumnname = tables[t_inc].columns[c_inc].COLUMN_NAME;
                        var index = search.findIndex(tables,tables[t_inc].columns[c_inc].column_relation.REFERENCED_TABLE_NAME);
                        setRelation(tables,tables[index],relation)
                    }
                }
            }
        }
    }
}

function setRelation(tables,table,relation){
    var index = search.findIndex(tables,table.table_name);
    if(typeof(tables[index].relations) == 'undefined')
        tables[index].relations =[];
    tables[index].relations.push(relation);
}

    