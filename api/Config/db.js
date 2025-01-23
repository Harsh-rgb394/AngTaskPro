const mongoose=require("mongoose");


const MongoConnect=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connection successfull");
    } catch (error) {
        console.log("Connection error",error);
        
    }
}

module.exports=MongoConnect;