const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

mongoose.connect("")

const app = express();
app.use(express.json());

app.post("/user/signup", async function (req, res){
    res.json({
        message: "signup endpoint"
    })
})
app.post("/user/login", async function (req, res){
    res.json({
        message: "signin endpoint"
    })
})
app.get("/user/purchase", async function (req, res){
    res.json({
        message: "purchased endpoint"
    })
})
app.post("/course/purchase", async function (req, res){
    res.json({
        message: "purchased courses endpoint"
    })
})
app.get("/course", async function (req, res){
    res.json({
        message: "courses endpoint"
    })
})

