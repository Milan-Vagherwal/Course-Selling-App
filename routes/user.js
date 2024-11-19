const { Router } = require("express");
const { userModel, purchaseModel, courseModel } = require("../db");
const { userMiddleware } = require("../routes/middleware/user");
const userRouter = Router();
const jwt = require("jsonwebtoken");
const {JWT_USER_PASSWORD} = require("../config");



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
userRouter.get("/purchase", userMiddleware, async function (req, res){

    const userId = req.userId;

    const purchases = await purchaseModel.find({
        userId
    });

    let purchasedCourseIds = [];

    for (let i=0; i<purchases.length; i++){
        purchasedCourseIds.push(purchases[i].courseId)
    }

    const coursesData = await courseModel.find({
        _id : { $in: purchasedCourseIds}
    });
    // const coursesData = await courseModel.find({
    //     _id : { $in: purchases.map(x => x.courseId) }
    // });

    
    res.json({
                purchases,
                coursesData
            })
    })

module.exports = {
    userRouter: userRouter
}