const express = require('express');
const app = express();
const port = process.env.PORT||3000;
const courses = [
    {id:1,name:"Node.js"},
    {id:2,name:"React.js"},
    {id:3,name:"Git"}
];
app.use(express.json());  //To parse Json object on using express.

app.get('/',(req,res)=>{   //This is how we define a route(endpoint)
    res.send("Hello World!!!");
});

app.get('/api/courses',(req,res)=>{
    res.send([1,2,3,4,5]);
});

//Route Params
app.get('/api/courses/:id',(req,res)=>{
   let course = courses.find(c=> c.id==req.params.id);
   if(!course){   //One of the REST constraints
       res.status(404).send("The course with given id is not found");
   }
   else{
       res.send(course);
   }
});

//Multiple route params
app.get('/api/posts/:year/:month',(req,res)=>{
 //  res.send(req.params);  //To send route params
    res.send(req.query);    //To send query string params
});


//Creating a post request
app.post('/api/courses',(req,res)=>{
const course = {
    id: courses.length + 1,
    name: req.body.name
}
courses.push(course);
res.send(course);
});
app.listen(port,()=>{
    console.log(`Listening on port ${port}....`);
})