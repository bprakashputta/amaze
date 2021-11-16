const express = require('express');
const {request, response} = require("express");
const homeRouter = express.Router();

homeRouter.get('/', async (request, response)=>{
    return response.send("Welcome Amaze Application");
});

module.exports = homeRouter;