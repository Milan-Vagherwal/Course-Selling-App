// const express = require("express"); {Router}
// const Router = express.Router;
const { Router } = require("express");
const { userModel } = require("../db");
const userRouter = Router();
const jwt = require("jsonwebtoken");
const JWT_USER_PASSWORD = "alamde3245";


userRouter.post("/signup", async function (req, res){
    const { email, password, firstName, lastName } = req.body; // add zod validation
    
    //put inside try catch block
    try {
        await userModel.create({
            email,
            password,
            firstName,
            lastName
        }) 
    
        res.json({
                message: "signup sucessful"
                })
    }
    catch (e){
        error: e
    }
    })
userRouter.post("/login", async function (req, res){
    const { email , password } = req.body;
    const user = await userModel.findOne({
        email: email,
        password: password
    });
    if(user){
        const token = jwt.sign({
            id: user._id,
        },JWT_USER_PASSWORD);

        res.json({
            token: token
        })
    }
    else{
        res.status(403).json({
            message: "Incorrect Credentials"
        })
    }
    })
userRouter.get("/purchase", async function (req, res){
            res.json({
                message: "purchased endpoint"
            })
    })


module.exports = {
    userRouter: userRouter
}