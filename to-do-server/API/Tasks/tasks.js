const { ObjectId } = require("mongodb");

const addATask = (app, Users) => {
    app.put("/user/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const newTask = req.body;
            // console.log(newTask)

            //first find the user you want to add a taks to
            const query = { _id: ObjectId(id) }
            const findUser = await Users.findOne(query);

            //finding all the tasks of that user and adding a new task
            let tasks = findUser.tasks;
            if (!findUser.tasks) {
                tasks = [];
            }

            tasks.push(newTask.task);

            //updating the data in database
            const update = {
                $set: {
                    tasks: tasks
                }
            }

            const updatedData = await Users.updateOne(query, update, { upsert: true })

            res.send({
                success: true,
                message: "Task Added"
            })
        } catch (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
    })
}



const moveToRight = (app, Users) => {
    try {
        app.put("/task/:id", async (req, res) => {

            const id = req.params.id;
            const query = { _id: ObjectId(id) };

            const data = req.body;
            const { i, position, task } = data;


            //find the user and remove the task from previous div
            const findUser = await Users.findOne(query);
            let tasks = findUser.tasks;
            tasks.splice(i, 1);

            //now update the previous div first

            const update = {
                $set: {
                    tasks: tasks
                }
            }
            const updatedData = await Users.updateOne(query, update, { upsert: true });


            // //now send it to next div and update the div
            const filter = { position: position + 1 };
            const findNewDiv = await Users.findOne(filter);


            let newDivtasks = findNewDiv.tasks;
            if (!findNewDiv.tasks) {
                newDivtasks = [];
            }

            if (i>= 0 && i <= newDivtasks.length){
                newDivtasks.splice(i, 0, task);
            }
            else{
               newDivtasks.push(task); 
            }
            
            //now update the new div
            const updateNew = {
                $set: {
                    tasks: newDivtasks
                }
            }

            const updatedNewDiv = await Users.updateOne(filter, updateNew, { upsert: true })
            res.send({
                success:true,
                message:"Moved to the right"
            })

        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
}



//api for moving the data left side
const moveToLeft = (app, Users) => {
    try {
        app.put("/lefttask/:id", async (req, res) => {

            const id = req.params.id;
            const query = { _id: ObjectId(id) };

            const data = req.body;
            const { i, position, task } = data;


            //find the user and remove the task from previous div
            const findUser = await Users.findOne(query);
            let tasks = findUser.tasks;
            tasks.splice(i, 1);

            //now update the previous div first

            const update = {
                $set: {
                    tasks: tasks
                }
            }
            const updatedData = await Users.updateOne(query, update, { upsert: true });


            // //now send it to next div and update the div
            const filter = { position: position - 1 };
            const findNewDiv = await Users.findOne(filter);


            let newDivtasks = findNewDiv.tasks;
            if (!findNewDiv.tasks) {
                newDivtasks = [];
            }

            if (i>= 0 && i <= newDivtasks.length){
                newDivtasks.splice(i, 0, task);
            }
            else{
               newDivtasks.push(task); 
            }
            
            //now update the new div
            const updateNew = {
                $set: {
                    tasks: newDivtasks
                }
            }

            const updatedNewDiv = await Users.updateOne(filter, updateNew, { upsert: true })
            res.send({
                success:true,
                message:"Moved to the left"
            })

        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
}


module.exports = { addATask, moveToRight,moveToLeft };