 const express = require("express")
const connect = require("./configs/db")
const {body,validationResult} = require("express-validator")
const usercontroller = require("./controller/user.controller")
const Postcontroller = require("./controller/post_controller")

const {register,login} = require("./controller/auth.controller")
const router = require("./controller/post_controller")
const app = express()
app.use(express.json())
app.post("/register",body("email").isEmail().withMessage("Invaild Email"),body("password").isLength({min:8}).withMessage("Please use strong password"),register)
app.post("/login",body("email").isEmail().withMessage("Invaild Email"),body("password").isLength({min:8}).withMessage("Invaild Password"),login)
app.use("/users",usercontroller)
app.use("/post",Postcontroller)
 app.listen(2345, async () => {
     try{
         await connect()
     }catch(err){
         console.log(err.message)
     }
     console.log("Listening on port 2345")
 })
 