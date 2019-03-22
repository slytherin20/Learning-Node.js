const http=require('http');
const Server=http.createServer((req,res)=>{
    if(req.url=="/")
    {
        res.write("hello world!!");
        res.end();
    }
});

Server.listen(3000);
console.log("Server listening at port 3000...");