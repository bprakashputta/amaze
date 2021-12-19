// Users Route
// All the user routes will be here
const express = require("express");
const mongoose = require("mongoose");
const {request, response} = require("express");
const userRoute = express.Router();
const {userSchema, User, validate} = require("../models/user");

userRoute.get("/users", (request, response)=>{
   const users = "";
});

userRoute.post("/signup", async (request, response)=>{
   // Step 1 : Validate Request Object
   const {error} = await validate(request.body);
   if(error){
      return response.status(400).send(error.message);
   }
   // Step 2 : Check if user with username already exists
   let user = await User.findOne({username: request.body.username});
   if(user){
      console.log("User ID : ", user._id);
      return response.status(400).send("User with username already exists");
   }else{
      user = await User.findOne({email: request.body.email});
      if(user){
         console.log("User ID : ", user._id);
         return response.status(400).send("User with email already exists");
      }
      user = await new User({
         username: request.body.username,
         email: request.body.email,
         password: request.body.password
      });
      await user.save();
   }
   // Step 3 : Create User
   // Step 4 : Return User Object generated
   return response.send(user);
});

module.exports = userRoute