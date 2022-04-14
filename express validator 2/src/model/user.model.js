const mongoose = require("mongoose")

const userShema = new mongoose.Schema({
    frist_name:{type:String,required:true},
    last_name:{type:String,required:true},
    email:{type:String,required:true},
    pincode:{type:Number,required:true},
    age:{type:Number,required:true},
    gender:{type:String,required:true}
})

const User = mongoose.model("user",userShema)

module.exports = User;