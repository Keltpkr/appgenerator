var search = require("./ObjectSearch");

module.exports = {
    GetRelations: function(tables) {
        // check relations
        for (var t_inc=0;t_inc<tables.length;t_inc++){
            // Detect if associative table
            if (isAssociativeTable(tables,tables[t_inc])){
                for (var c_inc=0;c_inc<tables[t_inc].columns.length;c_inc++){
                     if (tables[t_inc].columns[c_inc].COLUMN_KEY=='MUL') {
                        var relation = {};
                        relation.type = 'manytomany';
                        relation.relatedtablename = tables[t_inc].columns[c_inc].column_relation.REFERENCED_TABLE_NAME;
                        relation.relatedcollumnname = tables[t_inc].columns[c_inc].column_relation.REFERENCED_COLUMN_NAME;
                        setRelation(tables[search.findIndex(tables[t_inc].columns[c_inc].column_relation.REFERENCED_TABLE_NAME)],relation)
                    }                   
                }
            } else {
                for (var c_inc=0;c_inc<tables[t_inc].columns.length;c_inc++){
                    // Check if column has relation
                    if (tables[t_inc].columns[c_inc].COLUMN_KEY=='MUL') {
                        var relation = {};
                        relation.type = 'onetomany';
                        relation.relatedtablename = tables[t_inc].columns[c_inc].column_relation.REFERENCED_TABLE_NAME;
                        relation.relatedcollumnname = tables[t_inc].columns[c_inc].column_relation.REFERENCED_COLUMN_NAME;
                        setRelation(tables[t_inc],relation)

                        relation.type = 'manytoone';
                        relation.relatedtablename = tables[t_inc].table_name;
                        relation.relatedcollumnname = tables[t_inc].columns[c_inc].COLUMN_NAME;
                        setRelation(tables[search.findIndex(tables[t_inc].columns[c_inc].column_relation.REFERENCED_TABLE_NAME)],relation)
                    }
                }
            }
        }
    }
}
function isAssociativeTable(tables,table){
    
    // 2 tables names separated with an underscore
    var u_pos = table.table_name.indexOf('_');
    if (u_pos != -1){
        var table1 =  table.table_name.substring(0,u_pos);
        var table2 =  table.table_name.substring(u_pos+1,table.table_name.length);
        if (search.findIndex(tables,table1) != -1 && search.findIndex(tables,table2) != -1)
            return true;
    }
        return false;
}
function setRelation(table,relation){
    console.log(relation);
}
//console.log(t);                 
//test.BuildRelations()
    