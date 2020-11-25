const express = require('express');
const router = express.Router();   //Router is a class and router is its instance which us also a middleware and a routing system in itself.
const Joi = require('joi');

const courses = [
    {id:1,name:"Node.js"},
    {id:2,name:"React.js"},
    {id:3,name:"Git"}
];

router.get('/',(req,res)=>{
    res.send(courses);
});

//Route Params
router.get('/:id',(req,res)=>{
    let course = courses.find(c=> c.id==req.params.id);
    if(!course){   //One of the REST constraints
        res.status(404).send("The course with given id is not found");
    }
    else{
        res.send(course);
    }
});

//Multiple route params
router.get('/:year/:month',(req,res)=>{
    //  res.send(req.params);  //To send route params
    res.send(req.query);    //To send query string params
});


//Creating a post request
router.post('/',(req,res)=>{


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
router.put('/:id',(req,res)=>{
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
router.delete('/:id',(req,res)=>{
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

module.exports = router;