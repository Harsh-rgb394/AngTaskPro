const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        requried:true
    },
    email:{
        type:String,
        requried:true,
        unique:true
    },
    password:{
        type:String,requried:true
    },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }, // 'user' is the default role
})


const user=mongoose.model("user",userSchema);

module.exports=user;