const EventEmitter=require('events');
class Logger extends EventEmitter{
    log(message){
        console.log(message);
        this.emit("messageLogged",{data:"hello there!"});
    }
}
module.exports=Logger;