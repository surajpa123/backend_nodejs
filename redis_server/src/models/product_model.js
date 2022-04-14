
const mongoose = require("mongoose");
 
const productSchema = mongoose.Schema({
    name:{type:String,required:true},
    body:{type:String,required:true}
},

{
    versionKey:false,
    timestamps:true
}
)

module.exports = new mongoose.model("product",productSchema)