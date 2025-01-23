const mongoose=require("mongoose");


const taskSchema=new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, default: 'Incomplete', enum: ['Incomplete', 'Completed'] },
  dueDate: { type: Date, required: true },
  createdDate: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }
})

const task=mongoose.model("Task",taskSchema);

module.exports=task;