const mongoose = require("mongoose");
const Joi = require("joi");
const {model} = require("mongoose");
JoiObjectId = require("joi-objectid")(Joi);

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 20
    },
    email: {
        type: String,
        unique: true,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 16
    },
    gender: {
        type: String,
    },
    date_of_birth:{
        type: Date,
    },
    phone_number:{
        type: Number,
    },
    role:{
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
},{
    timestamps: true
});

const User = mongoose.model('User',userSchema);

function validateSchema(user){
    const schema = Joi.object({
        username: Joi.string().min(6).max(20).required(),
        email: Joi.string().max(255).required().email(),
        password: Joi.string().min(6).max(26).required(),
        gender: Joi.string(),
        date_of_birth: Joi.date(),
        phone_number: Joi.number(),
        role: Joi.string()
    });
    return schema.validate(user);
}

module.exports.userSchema = userSchema;
module.exports.User = User;
module.exports.validate = validateSchema;