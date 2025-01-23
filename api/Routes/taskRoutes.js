const express=require("express");
const router=express.Router();
const {getalltasks,createtask,updatetask,deletetask}=require("../Controllers/TaskController");
// appylying middleware 
const authMiddleware=require("../Middlewares/authMiddleware")

router.get('/getalltasks',authMiddleware,getalltasks);

router.post("/createtask",authMiddleware,createtask);

router.put("/updatetask/:id",authMiddleware,updatetask);

router.delete("/deletetask/:id",authMiddleware,deletetask);


module.exports=router;