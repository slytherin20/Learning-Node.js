'use srtict';
console.log(__filename);
console.log(__dirname);

//Exporting a module
var url='https://www.google.com/';
function log(message){
    console.log(message);
}

module.exports=log;

//Module wrapper function
//The file that is exported to another file is not like shown above but each file is exported inside another function.
//The above code actually looks like this.
//function(exports,require,module,__filename,_dirname){
//var url='https://www.google.com/';
//( function log(message){
//     console.log(message);
// }
//
// module.exports=log;
//});
//This is the module wrapper function is an IIFI executed.
