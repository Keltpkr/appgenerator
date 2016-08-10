module.exports = {
    findIndex: function(myArray,searchString){
        var found = -1;
        for(var i=0;i<myArray.length;i++){
            for (var key in myArray[i]){
                if (myArray[i][key] == searchString){
                    found = i;
                    break;
                }
                if (found > -1)
                    break;
            }
        }
    return found;
    }
}