const user=require("../models/User")
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");

const logincontroller=async(req,res)=>{
    const {email,password}=req.body;

    try {
        const userdata=await user.findOne({email});

        if(!userdata){
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        
        const Comparedpassword= bcrypt.compare(password,userdata.password);

        if(!Comparedpassword){

            res.status(400).json({message:"password not match"});
        }

        const token=jwt.sign({email:userdata.email,userId:userdata._id,role:userdata.role},process.env.JWT_SECRET,{expiresIn:'1d'});

        res.status(200).json({message:"login success",data:userdata,token});
    } catch (error) {
        res.status(500).json({message:"Something went wrong"});
        
    }


    

}


const registercontroller=async(req,res)=>{
    const {name,email,password,confirmPassword}=req.body;

    try {
        const exituser=await user.findOne({email});
        if(exituser){
            res.status(404).json({message:"email already there"});
            return;
        }

        if(password!==confirmPassword){
            res.status(400).json({message:"password not match"});
            return;

        }

        const hashedpassword=await bcrypt.hash(password,10);

        const result=await user.create({name,email,password:hashedpassword});

        if(result){
            res.status(200).json({message:"user created successfully"});
        }


    } catch (error) {
        res.status(400).json({message:error.message});
    }

}

module.exports={logincontroller,registercontroller};