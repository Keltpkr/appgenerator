function isAssociativeTable(table){
    return table.table_name;
}

module.exports = {
    GetRelations: function(tables) {

        // check relations
        // create relation on tble
        // create relation in related table
        for (var t_inc=0;t_inc<tables.length;t_inc++){
            // Detect if associative table
            // if (isAssociativeTable(tables[t_inc]))
            console.log(isAssociativeTable(tables[t_inc]));
            for (var c_inc=0;c_inc<tables[t_inc].columns.length;c_inc++){
                
                
                // Check if column has relation
                if (tables[t_inc].columns[c_inc].COLUMN_KEY=='MUL') {
                    //console.log('Table : ' + tables[t_inc].table_name + ' Column: ' + tables[t_inc].columns[c_inc].COLUMN_NAME)
                }
            }
        }
        
        return tables;
    }

}
function isAssociativeTable(table){
        // 2 tables names separated with an underscore
        // with 2 columns that end with _id
        // has foreigns keys with related table's names that matches table's names on each sides of underscore
        return 'toto';
}
//console.log(t);                 
//test.BuildRelations()
    