const task = require("../models/Task");


const getalltasks=async(req,res)=>{
    try {
        let tasks;
        if(req.userRole==='admin'){
            tasks=await task.find();
        }
        else{
            // console.log(typeof(req.userId));

        tasks=await task.find({userId:req.userId});
        }
        res.status(200).json({message:"Tasks getted successfully",data:tasks});
        
    } catch (error) {
        res.status(400).json({message:error.message});
        
    }

}


const createtask=async(req,res)=>{
    const {title,description,dueDate}=req.body;
    console.log(title,description,dueDate);
    const userId=req.userId;
    console.log(userId);


    try {

      
        const taskdata=new task({
            title,
            description,
            dueDate,
            userId: userId, // Admin can create for others
        })

        await taskdata.save();
        res.status(200).json({message:"task created successfully",data:taskdata});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}


const updatetask=async(req,res)=>{
    const {id}=req.params;
    const { title, description, status, dueDate } = req.body;


    try {
        const taskdata = await task.findById(id);
    
        if (!taskdata) {
          return res.status(404).json({ message: 'Task not found' });
        }
    
        // Check if the user is authorized
        // if (req.userRole !== 'admin' && taskdata.userId.toString() !== req.userId) {
        //   return res.status(403).json({ message: 'Unauthorized to update this task' });
        // }

        const updatedtask=await task.findByIdAndUpdate(id,{title,description,status,dueDate},{new:true,runValidators:true});
       
   
        res.status(200).json({message:"user updated ",data:updatedtask});
      } catch (error) {
        res.status(400).json({ message: error.message });
      }


}

const deletetask=async(req,res)=>{
    const { id } = req.params;

  try {
    const taskdata = await task.findById(id);

    if (!taskdata) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if the user is authorized
    await task.findByIdAndDelete(id);
    

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }

}


module.exports={getalltasks,createtask,updatetask,deletetask};