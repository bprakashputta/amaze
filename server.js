const express = require('express');
const {request, response} = require("express");
const amaze = express();
const helmet = require('helmet');
const morgan = require('morgan');
const debug = require('debug')
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/amaze')
    .then(()=>{
        console.log("Connected to Amaze database");
    })
    .catch((err)=>{
        console.log(err.message);
    });



const home = require('./routes/home');
const mongoose = require("mongoose");

amaze.use(express.json());
amaze.use(express.urlencoded({extended: true}));
amaze.use(express.static('public'));
amaze.use(helmet());
amaze.use('/', home);

amaze.get('/', (request, response)=>{
    return response.send(home);
});

amaze.listen(PORT, ()=>{
    console.log("Server is running on PORT: ", PORT);
});