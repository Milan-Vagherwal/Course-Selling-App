const {Router} = require("express");
const adminRouter = Router();
// adminRouter.use(adminMiddleware);
const {adminModel, courseModel} = require("../db");
// const {courseModel} = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_ADMIN_PASSWORD} = require("../config");
const course = require("./course.js");
const { adminMiddleware } = require("./middleware/admin");


adminRouter.post("/signup", async function (req, res){
    const {email , password, firstName, lastName} = req.body;
    try {
        await adminModel.create({
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
adminRouter.post("/login", async function (req, res){
     const { email , password } = req.body;
     const admin = await adminModel.findOne({
         email: email,
         password: password
     });
     if(admin){
         const token = jwt.sign({
             id: admin._id,
         },JWT_ADMIN_PASSWORD);
 
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
adminRouter.post("/course", adminMiddleware, async function (req, res){
     const adminId = req.adminId;
     const {title, description, imageURL, price} = req.body;

     const course = await courseModel.create({
        title,
        description, 
        imageURL, 
        price, 
        creatorId: adminId
     })

    res.json({
         message: "Course Creation",
         courseId: course.id
     })
})
adminRouter.put("/course", adminMiddleware, async function (req, res){
    const adminId = req.adminId;
    const {title, description, imageURL, price, courseId} = req.body;

    const course = await courseModel.updateOne({
        _id: courseId,
        creatorId: adminId
    },{
       title: title,
       description: description, 
       imageURL: imageURL, 
       price: price
    })

   res.json({
        message: "Course Updated",
        courseId: course.id
    })
})
adminRouter.get("/course/bulk", adminMiddleware, async function (req, res){
    const adminId = req.adminId;
    const courses = await courseModel.find({
        creatorId: adminId
    })

   res.json({
        message: "Course Updated",
        courses
    })
})

module.exports = {
    adminRouter: adminRouter
}