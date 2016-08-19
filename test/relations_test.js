/*
process.env.NODE_ENV = 'test';

var chai = require('chai');
var expect = require('chai').expect;

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
    }
];


describe('Relations', function() {
    describe('BuildRelations', function() {
        var rel = require('../app/lib/relations')
        it('should return \'groups_users\' table name for index 0', function() {
            var response = rel.BuildRelations(t);
            expect(response[0].table_name).to.equal('groups_users');
        });
    });
});
*/