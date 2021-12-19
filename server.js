const express = require("express");
const bodyParser = require("body-parser");
const {request, response} = require("express");
const amaze = express();
const mongoose = require("mongoose");
// const helmet = require('helmet');
// const morgan = require('morgan');
const PORT = 8080;
const users = require("./routes/users")
amaze.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost:27017/amaze").then(()=>{
    console.log("Connected to MongoDB Database");
}).catch((err)=>{
    console.log("Ran into Error : " + err.message);
});

amaze.use(express.json());
amaze.use('/api/users', users);
amaze.get('/', (request, response)=>{
    return response.send("Welcome to Amaze");
})


amaze.listen(PORT, (err)=>{
    if(err){
        console.log(err.message);
        return;
    }
    console.log("Server is running on PORT ",PORT);
});