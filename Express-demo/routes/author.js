const express = require('express');
const router = express.Router();
router.get('/',(req,res)=>{   //This is how we define a route(endpoint)
    // res.send("Hello World!!!");
    res.render('index',{title:'My Express App',message:'Hello'});
});

module.exports = router;