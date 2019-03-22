const Logger=require('./app');
console.log(Logger);
const logger=new Logger();
logger.on("messageLogged",(args)=>{
    console.log(args);
});
logger.log('message');