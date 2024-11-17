const {Router} = require("express");
const adminRouter = Router();
// adminRouter.use(adminMiddleware);
const {adminModel} = require("../db");
const JWT_ADMIN_PASSWORD = "alamde32445";
const jwt = require("jsonwebtoken");


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
adminRouter.post("/course", async function (req, res){
     res.json({
         message: "course creation endpoint"
     })
})
adminRouter.put("/course", async function (req, res){
     res.json({
         message: "course creation endpoint"
     })
})
adminRouter.get("/course/bulk", async function (req, res){
     res.json({
         message: "course creation endpoint"
     })
})

module.exports = {
    adminRouter: adminRouter
}