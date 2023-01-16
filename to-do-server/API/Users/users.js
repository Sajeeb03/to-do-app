const getUsers = (app,Users)=>{


app.get("/user", async (req, res) => {
try {
    const result = await Users.find({}).sort({position:1}).toArray();
    res.send({
        success:true,
        data:result
    })
} catch (error) {
    res.send({
        success:false,
        message:error.message
    })
}
})
}



//use it if you want to post user
// app.post("/user", async (req, res) => {
//     const result = await Users.insertMany(req.body);
//     res.send("user updated")
// })

module.exports ={getUsers};