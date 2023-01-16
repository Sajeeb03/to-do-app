const express = require('express');
const cors = require('cors');
const dbConnect = require('./Config/dbConnent');
const Users = require('./Config/dbConnent');
const { getUsers } = require('./API/Users/users');
const { addATask, moveToRight, moveToLeft } = require('./API/Tasks/tasks');
require("dotenv").config();




//declaring the port
const port = process.env.PORT || 8000;

//creating the app
const app = express();



//midlewares
//cors for making the code suitable for different platforms.
app.use(cors());
app.use(express.json())




//get all the users from db

getUsers(app,Users);

//add a task 
addATask(app,Users);

//move the task to the right
moveToRight(app,Users);

//move the task to the left
moveToLeft(app,Users);


//the first api
app.get("/", (req, res) => {
    res.send("server is running")
})
///listening the server
app.listen(port, () => console.log(`Server is running at ${port}`))