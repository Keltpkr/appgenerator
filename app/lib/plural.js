module.exports = {
    getSingular: function(plural){
       var list = {
           'countries':'country',
            'families':'family',
            'adresses':'adress'
        }
        
        var resp = list[plural];
        if (typeof(resp) == 'undefined')
            resp = plural.substring(0,plural.length - 1);
    
    //console.log(plural);
    return resp;
    }
}