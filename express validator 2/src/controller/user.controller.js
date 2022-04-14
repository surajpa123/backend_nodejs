const express = require("express");
const { append } = require("express/lib/response");
const res = require("express/lib/response");
const {body,validationResult} = require("express-validator")
const User = require("../model/user.model")

const router = express.Router();

router.post("/",body("id").isLength({min: 1}).withMessage("id is required"),
body("frist_name").isLength({min:1}).withMessage("fristname is required"),
body("last_name").isLength({min:1}).withMessage("last name is required"),
body("email").isEmail().withMessage("Vaild email is required"),
body("pincode").isLength({min:6,max:6}).withMessage("Pincode is required"),
body("age").isLength({min:1,max:2}).withMessage("Age is required and should be vaild"),
body("gender").isAlpha().isLength({min:4}).withMessage("gender is required and should be vaild")
,async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({data:errors.array()})
    }
   const user = await User.create(req.body)
   return res.status(201).json({data: user})
})

module.exports = router;