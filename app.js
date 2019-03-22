function greeting(name){
    console.log(`Hello ${name}`); //global object
}
greeting('Slytherin');
var message='';
console.log(global.message);

//In js console.log is of window object but in node.js we do not have window instead wwe have global but when we run
//global.message we get undefined this is because scope of message is limited to this file only this is because of modules.
//Modules in node available-
//Os,fs,events,http.

//Loading of a module
var logger= require('./modules');
console.log(logger.log('message'));