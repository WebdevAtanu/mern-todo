import {taskModel} from '../model/task.model.js';

export const addTask=async(req,res)=>{
const {title,description}=req.body;
await taskModel.create({
	title,
	description,
	user:req.user
});
res.status(201).json({
	message:'Task added'
})
};

export const getTask=async(req,res)=>{
	const userid=req.user._id;
	const tasks=await taskModel.find({user:userid});
	res.status(200).json({
		success:true,
		tasks
	})
}

export const updateTask=async(req,res)=>{
	const tasks=await taskModel.findById(req.params.id);
	tasks.isComplete=!tasks.isComplete;
	await tasks.save();
	res.status(200).json({
		success:true,
		message:'Task updated'
	})
}

export const deleteTask=async(req,res)=>{
	const tasks=await taskModel.findById(req.params.id);
	if(!tasks)
		return res.status(404).json({
			message:'Task not found'
		})
	await tasks.deleteOne();
	res.status(200).json({
		success:true,
		message:'Task deleted'
	})
}