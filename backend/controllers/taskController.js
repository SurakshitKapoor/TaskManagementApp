
const Task = require('../models/Task');

//createTask
exports.createTask = async (req, resp) => {
    try{
        const {task} = req.body;

        if(!task) {
            return resp.status(404).json({
                success:false,
                message:"Please provide the task"
            })
        };

        const existingTask = await Task.findOne({task:task});
        if(existingTask) {
            return resp.status(404).json({
                success:false,
                message:"The Task is already present in your list"
            })
        }
        console.log("existing task : ", existingTask);

        const newTask = await Task.create({task});
        console.log("newTask is : ", newTask);

        return resp.status(200).json({
            success:true,
            message:"the task is created successfully",
            task:newTask,
        })
    }
    catch(error) {
        console.log("Failed to creaet task ");
        console.log("error : ", error);

        return resp.status(500).json({
            success:false,
            message:"Failure occured while creating the Task"
        })
    }
}


//deleteTask
exports.deleteTask = async(req, resp) => {
    try{
        const taskId = req.params.taskId;
        // const task = req.body.task;

        const deletedTask = await Task.findOneAndDelete({_id:taskId});
        console.log("deletedTask : ", deletedTask);

        if(!deletedTask) {
            return resp.status(404).json({
                success:false,
                message:"The Task is not present in yout list, please search again"
            })
        }
        return resp.status(200).json({
            success:true,
            message:"the Task is deleted successfully",
            deletedTask : deletedTask
        })
    }
    catch(error) {
        console.log("Failue occured while deleting the task : ", error.message);

        return resp.status(500).json({
            success:false,
            message:"Something went wrong while deleting the task"
        })
    }
}


//getAllTasks
exports.getAllTasks = async(req, resp) => {
    try{
        const allTasks = await Task.find({});
        console.log("allTasks : ", allTasks);

        return resp.status(200).json({
            success:true,
            message:"All tasks are fetched successfully !",
            allTasks: allTasks
        })
    }
    catch(err) {
        console.log("Error occured while getting all tasks : ", err.message);

        return resp.status(500).json({
            success:false,
            message:"Something went wrong while fetching all tasks",
            error: err.message
        })
    }
}


//updateTask
exports.updateTask = async(req, resp) => {
    try{

        const {task} = req.body;

        const taskId = req.params.taskId;
        console.log("taskId : ", taskId );

        if(!taskId || !task) {
            return resp.status(404).json({
                success:false,
                message:"Input data is empty"
            })
        }

        const updatedTask = await Task.findByIdAndUpdate({_id:taskId}, {
            task:task,
            updatedAt: new Date(),
        }, 
        {new:true});
        console.log("updatedTask is : ", updatedTask);

        return resp.status(200).json({
            success:true,
            message:"The task is updated successfully ",
            updatedTask: updatedTask
        })

    }
    catch(err) {
        console.log("Error occured while updating the task : ", err.message);

        return resp.status(500).json({
            success:false,
            message:"Something went wrong while updating the task"
        })
    }
}