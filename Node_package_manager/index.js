var _=require('underscore');
//how require works:
//it assumes first that it is a core module,then assume it is a file or a folder and third it assumes it is a node module.
var result=_.contains([1,2,3],3);
console.log(result);