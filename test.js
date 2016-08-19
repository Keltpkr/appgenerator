var rel = require('./app/lib/relations')
var t = [
    {
        table_name:'groups_users',
        columns:[
            {  
                COLUMN_NAME:'group_id',
                COLUMN_TYPE:'int(10) unsigned',
                COLUMN_KEY:'MUL',
                column_relation:{
                    COLUMN_NAME:'group_id',
                    TABLE_NAME:'groups_users',
                    REFERENCED_TABLE_NAME:'groups',
                    REFERENCED_COLUMN_NAME:'id',
                    UPDATE_RULE:'RESTRICT',
                    DELETE_RULE:'CASCADE'
                }
            },
            {  
                COLUMN_NAME:'user_id',
                COLUMN_TYPE:'int(10) unsigned',
                COLUMN_KEY:'MUL',
                column_relation:{
                    COLUMN_NAME:'user_id',
                    TABLE_NAME:'groups_users',
                    REFERENCED_TABLE_NAME:'users',
                    REFERENCED_COLUMN_NAME:'id',
                    UPDATE_RULE:'RESTRICT',
                    DELETE_RULE:'CASCADE'
                }
            },
            {  
                COLUMN_NAME:'created_at',
                COLUMN_TYPE:'datetime',
                COLUMN_KEY:''
            },
            {  
                COLUMN_NAME:'updated_at',
                COLUMN_TYPE:'datetime',
                COLUMN_KEY:''
            }
        ]
    },
    {
        table_name:'groups',
        columns:[
            {  
                COLUMN_NAME:'id',
                COLUMN_TYPE:'int(10) unsigned',
                COLUMN_KEY:'PRI'
            },
            {  
                COLUMN_NAME:'groupname',
                COLUMN_TYPE:'varchar(255)',
                COLUMN_KEY:''
            },
            {  
                COLUMN_NAME:'created_at',
                COLUMN_TYPE:'datetime',
                COLUMN_KEY:''
            },
            {  
                COLUMN_NAME:'updated_at',
                COLUMN_TYPE:'datetime',
                COLUMN_KEY:''
            }
        ]
    },
    {
        table_name:'users',
        columns:[
            {  
                COLUMN_NAME:'id',
                COLUMN_TYPE:'int(10) unsigned',
                COLUMN_KEY:'PRI'
            },
            {  
                COLUMN_NAME:'firstname',
                COLUMN_TYPE:'varchar(255)',
                COLUMN_KEY:''
            },
            {
                COLUMN_NAME:'lastname',
                COLUMN_TYPE:'varchar(255)',
                COLUMN_KEY:''
            },
            {  
                COLUMN_NAME:'birthdate',
                COLUMN_TYPE:'datetime',
                COLUMN_KEY:''
            },
            {  
                COLUMN_NAME:'created_at',
                COLUMN_TYPE:'datetime',
                COLUMN_KEY:''
            },
            {  
                COLUMN_NAME:'updated_at',
                COLUMN_TYPE:'datetime',
                COLUMN_KEY:''
            },
            {  
                COLUMN_NAME:'active',
                COLUMN_TYPE:'tinyint(1)',
                COLUMN_KEY:''
            },
            {  
                COLUMN_NAME:'country_id',
                COLUMN_TYPE:'nt(10) unsigned',
                COLUMN_KEY:'MUL',
                column_relation:{
                    COLUMN_NAME:'country_id',
                    TABLE_NAME:'users',
                    REFERENCED_TABLE_NAME:'countries',
                    REFERENCED_COLUMN_NAME:'id',
                    UPDATE_RULE:'RESTRICT',
                    DELETE_RULE:'RESTRICT'
                }
            }
        ]
    },
    {
        table_name:'countries',
        columns:[
            {  
                COLUMN_NAME:'id',
                COLUMN_TYPE:'int(10) unsigned',
                COLUMN_KEY:'PRI'
            },
            {  
                COLUMN_NAME:'countryname',
                COLUMN_TYPE:'varchar(255)',
                COLUMN_KEY:''
            },
            {
                COLUMN_NAME:'countrycode',
                COLUMN_TYPE:'varchar(2)',
                COLUMN_KEY:''
            },
            {  
                COLUMN_NAME:'countryisocode',
                COLUMN_TYPE:'varchar(3)',
                COLUMN_KEY:''
            },
            {  
                COLUMN_NAME:'created_at',
                COLUMN_TYPE:'datetime',
                COLUMN_KEY:''
            },
            {  
                COLUMN_NAME:'updated_at',
                COLUMN_TYPE:'datetime',
                COLUMN_KEY:''
            }
        ]
    }
];
var response = rel.SetRelations(t);
console.log(t);