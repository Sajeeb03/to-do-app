const { MongoClient } = require('mongodb');
require("dotenv").config();


//linking the server to the database;
const uri = process.env.URI;


const client = new MongoClient(uri)

const dbConnect = async () => {
    try {
        await client.connect()
        console.log("db connected")
    } catch (error) {
        console.log(error.message)
    }
}

dbConnect();

//database collections
const Users = client.db("To-Do").collection("users");


module.exports = Users;