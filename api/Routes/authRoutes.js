const express=require("express");
const {logincontroller,registercontroller}=require("../Controllers/UserController")
const router=express.Router();


router.post("/login",logincontroller);
router.post("/register",registercontroller);

module.exports=router;