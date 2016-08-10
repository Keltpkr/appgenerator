var search = require("./ObjectSearch");

module.exports = {
    isAssociativeTable: function(tables,table){
        
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
}