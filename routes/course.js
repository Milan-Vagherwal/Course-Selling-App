const {Router} = require("express");
const courseRouter =  Router();
    courseRouter.post("/purchase", async function (req, res){
        res.json({
            message: "purchased courses endpoint"
        })
    })
    courseRouter.get("/preview", async function (req, res){
        res.json({
            message: "courses preview endpoint"
        })
    })

module.exports = {
    courseRouter: courseRouter
}