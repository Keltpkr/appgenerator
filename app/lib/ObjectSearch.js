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
// var myarr = [{'obj1_prop1':'obj1_value1','obj1_prop2':'obj1_value2','obj1_prop3':'obj1_value3'},{'obj2_prop1':'obj2_value1','obj2_prop2':'obj2_value2','obj2_prop3':'obj2_value3'}]
// console.log(test.indexOf(myarr,'obj1_value3'));