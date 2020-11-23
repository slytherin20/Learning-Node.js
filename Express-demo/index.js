const Joi = require('joi');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./logger');
const app = express();
const port = process.env.PORT||3000;
const courses = [
    {id:1,name:"Node.js"},
    {id:2,name:"React.js"},
    {id:3,name:"Git"}
];
app.use(express.json());  //To parse Json object on using express.

app.use(express.urlencoded({extended:true})); //To parse url encoded payload (it is also a built-in middleware)

app.use(express.static('public'));  //Middleware to store static files

app.use(helmet()); //Helmet is used to make app more secure by setting various HTTP headers.

app.use(morgan('tiny')); //For HTTP request logging

//Custom middleware
app.use(logger);

//Another customer middleware
app.use(function(req,res,next){
   console.log("Authenticating.....");
   next();
});

app.get('/',(req,res)=>{   //This is how we define a route(endpoint)
    res.send("Hello World!!!");
});

app.get('/api/courses',(req,res)=>{
    res.send(courses);
});

//Route Params
app.get('/api/courses/:id',(req,res)=>{
   let course = courses.find(c=> c.id==req.params.id);
   if(!course){   //One of the REST constraints
       res.status(404).send("The course with given id is not found");
       return;
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


    const { error } = validateCourse(req.body);  //Object destructuring
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    console.log(res);
   // if(!req.body.name || req.body.name.length<3){
     //   res.status(400).send("Name does not exist or length is too small");
       // return;
    //}
const course = {
    id: courses.length + 1,
    name: req.body.name
}
courses.push(course);
res.send(course);
});

//Updating a course using its ID
app.put('/api/courses/:id',(req,res)=>{
   //Look up the course if present.
    let course = courses.find(c=>c.id==req.params.id);
    //If not found.
    if(!course){
        res.status(404).send("Course to be updated not found!!");
        return;
    }
    //Validate the strings.
   let result = validateCourse(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    console.log(result);
    //Update course
    course.name = req.body.name;

    //Return updated course to client.
    res.send(course);

});

//Deleting a course
app.delete('/api/courses/:id',(req,res)=>{
    //Look up the course to delete
    const course = courses.find(c=>c.id==req.params.id);
    //If not found
    if(!course){
        res.status(404).send("Course you are looking for is not found!!");
        return;
    }
    //If found delete the specified course
    const index = courses.indexOf(course);
    courses.splice(index,1);

    //Return the course
    res.send(course);


});

function validateCourse(course){
    const schema= {
        name: Joi.string().min(3).required()
    }
    const result = Joi.validate(course,schema);
    return result;
}

app.listen(port,()=>{
    console.log(`Listening on port ${port}....`);
})