import express from "express";
const app = express();
app.use(express.json())

import dotenv from "dotenv";
dotenv.config()

import mongoose from "mongoose";
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log(`MongoDb connected`);
}).catch(err => console.log(err))


app.listen(3000, () => {
    console.log(`Server is running on port ${3000}`);
})

// routes for the api
import("./routes/user.route.js").then(({default: userRoutes}) => app.use("/api/users", userRoutes))

import("./routes/auth.route.js").then(({default: authRoutes}) => app.use("/api/auth", authRoutes))

app.get("/test", async (req, res) => { 
    res.send('Bloggie')
})