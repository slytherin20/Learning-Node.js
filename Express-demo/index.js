const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const express = require('express');
const helmet = require('helmet');
const config = require('config');
const morgan = require('morgan');
const logger = require('./middlewares/logger');
const courses = require('./routes/courses');
const author = require('./routes/author');
const app = express();
const port = process.env.PORT||3000;

//Template engine
app.set('view engine','pug');
app.set('views','./views');         //By default no need to write this though

//Environment variable
//method-1
console.log(`process: ${process.env.NODE_ENV}`);

//method2
console.log(`app:${app.get('env')}`);

//Configuration
console.log("App name:" + config.get('name'));
console.log("Mail Server:"+config.get('mail.host'));
console.log("Mail Server password :"+config.get('mail.password'));

app.use(express.json());  //To parse Json object on using express.

app.use(express.urlencoded({extended:true})); //To parse url encoded payload (it is also a built-in middleware)

app.use(express.static('public'));  //Middleware to store static files

app.use(helmet()); //Helmet is used to make app more secure by setting various HTTP headers.

if(app.get('env')==='development'){
    app.use(morgan('tiny')); //For HTTP request logging
    //console.log('Morgan enabled');
    startupDebugger("Morgan is enabled..");
}
else{
    //console.log('Morgan disabled...')
    startupDebugger("Morgan is disabled..");
}

//DB work
dbDebugger("Connected to the database...");

//Custom middleware
app.use(logger);

//Another custom middleware
app.use(function(req,res,next){
   console.log("Authenticating.....");
   next();
});

app.use('/api/courses',courses);
app.use(author);

app.listen(port,()=>{
    console.log(`Listening on port ${port}....`);
})