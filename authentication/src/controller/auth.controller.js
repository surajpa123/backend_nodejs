require("dotenv").config();
const jwt = require("jsonwebtoken")
const User = require("../models/user.model")
const {body,validationResult} = require("express-validator")
const newToken = (user) => {
    return jwt.sign({user}, process.env.JWT_SECRET_KEY);
}

// const req = require("express/lib/request");


// const res = require("express/lib/response");
// const { JsonWebTokenError } = require("jsonwebtoken");
const register = async (req,res) => {
    try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

      let newErrors
      newErrors = errors.array().map((err) => {

        return { key: err.param, message: err.msg };
      });
      return res.status(400).send({ errors: newErrors });
    }

   let user = await User.findOne({email: req.body.email}).lean().exec();
   if(user) return res.status(500).send({message :"Please Try another email"});
   user = await User.create(req.body)

   const token = newToken(user)
        res.send({user,token});
    }catch(err){
        res.status(500).send(err.message)
    }
}


const login = async (req,res) => {
    try{
        // let user = await User.findOne({email: req.body.email});
        const user = await User.findOne({email:req.body.email})

        if(!user) return res.status(500).send({message :"Please Try another email"});


    const match = user.checkpass(req.body.password);
    if(!match) return res.status(400).send({message:"plz try with another pass"})

    const errors = validationResult(req);
        if (!errors.isEmpty()) {
    
          let newErrors
          newErrors = errors.array().map((err) => {
    
            return { key: err.param, message: err.msg };
          });
    
          return res.status(400).send({ errors: newErrors });
        }
    const token = newToken(user)
    res.send({user,token});
    }catch(err){
        res.status(500).send(err.message)
    }
}
module.exports = {register,login}