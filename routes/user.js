// const express = require("express"); {Router}
// const Router = express.Router;
const { Router } = require("express");
const userRouter = Router();


userRouter.post("/signup", async function (req, res){
           res.json({
            message: "signup endpoint"
            })
    })
userRouter.post("/login", async function (req, res){
            res.json({
                message: "signin endpoint"
            })
    })
userRouter.get("/purchase", async function (req, res){
            res.json({
                message: "purchased endpoint"
            })
    })


module.exports = {
    userRouter: userRouter
}