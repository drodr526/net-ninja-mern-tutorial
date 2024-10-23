require("dotenv").config()

const express = require('express');
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workoutsRouter");
const userRoutes = require("./routes/userRoutes.js");

//create express app
const app = express();

//prepares app to receive JSONs from client
app.use(express.json());

//middleware
app.use((req, res, next) => {

    next();
})

//routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log("listening on port ", process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    })



