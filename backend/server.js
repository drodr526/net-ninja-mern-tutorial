require("dotenv").config()

const express = require('express');

//create express app
const app = express();


//middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

//routes
app.get("/", (req, res) => {
    res.json({ mssg: "Welcome to the app" }); //resonds with a JSON 
})

//listen for requests
app.listen(process.env.PORT, () => {
    console.log("listening on port ", process.env.PORT);
});

