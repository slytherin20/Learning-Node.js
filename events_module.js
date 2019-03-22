//one of the core concepts in node is the concept of events.
//A signal that something has happened.
'use strict';
const EventEmitter=require('events');
const emitter=new EventEmitter();
//Listening to the event
emitter.on("message",function(){
  console.log("message listened");
});
//Raising an event
emitter.emit("message");

//Listening to event
emitter.addListener("logging",(arg)=>{             //addListener is same as on
    console.log(arg);
});
//Raising an event
emitter.emit("logging",{data:"Logged data"});

