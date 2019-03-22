const fs=require('fs');
fs.readdir('./',(err,data)=>{
    if(err)
        throw err;
    else
        console.log(data);
});
var files=fs.readdirSync('./');
console.log(files);