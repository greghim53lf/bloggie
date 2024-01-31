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


import userRoutes from "./routes/user.route.js"
app.use("/api/user", userRoutes)

import authRoutes from "./routes/auth.route.js"
app.use("/api/auth", authRoutes)


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error'
    res.status(statusCode).json({success: false, message})
})