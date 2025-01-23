const express=require("express");
const cors=require("cors");
// const bodyparser=require("body-parser")
const dotenv=require("dotenv");
const MongoConnect=require("./Config/db")
const useroute=require("./Routes/authRoutes");
const taskroute=require("./Routes/taskRoutes");
dotenv.config();
MongoConnect();

const PORT=process.env.PORT;

const app=express();

app.use(cors());
app.use(express.json({limit:'30mb',extended:true}));
app.use(express.urlencoded({limit:'30mb',extended:true}));



app.use("/user",useroute);
app.use("/task",taskroute);

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})