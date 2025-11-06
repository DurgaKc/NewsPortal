const express=require("express")
const { userSignUp, userLogin, changePassword} = require("../controller/user")
const authMiddleware = require("../middleware/auth")
const router=express.Router()

router.post("/signUp",userSignUp)
router.post("/login",userLogin)
router.put("/changePassword", authMiddleware, changePassword);


module.exports=router;