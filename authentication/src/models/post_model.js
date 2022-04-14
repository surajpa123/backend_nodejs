const mongoose = require("mongoose")
// const user  = require("./user.model")

const postSchema  =  mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:"user"}
})

module.exports = new mongoose.model("post",postSchema)