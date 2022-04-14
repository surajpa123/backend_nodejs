const mongoose = require("mongoose")
var bcrypt = require('bcryptjs');

const userSchema  =  mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true}
}

)
userSchema.pre("save",function (next) {
    if(! this.isModified("password")) return next();
    var hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;
    return next()
})

userSchema.methods.checkpass = function(password){
    return bcrypt.compareSync(password,this.password)
}

const User = mongoose.model("user",userSchema);

module.exports = User;