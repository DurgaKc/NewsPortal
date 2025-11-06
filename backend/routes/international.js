const express=require("express")
const { getInternationals, getInternational, addInternational, editInternational, deleteInternational } = require("../controller/international")
const upload = require("../middleware/upload")
const router=express.Router()

router.get("/getInternationals",getInternationals) //get all news
router.get("/:id",getInternational) //get a news
router.post("/addInternational",upload.single("image"), addInternational)     //add item
router.put("/editInternational/:id",upload.single("image"),editInternational) //edit news
router.delete("/deleteInternational/:id",deleteInternational) //delete news


module.exports=router