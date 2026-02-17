const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        minlength:3,
        unique:true,
        required:true
    },
    email:{
        type:String,
        match:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        required:true
    },
    password:{
        type:String,
        minlength:8,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model("user",userSchema)

