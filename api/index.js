import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config()

import mongoose from "mongoose";
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log(`MongoDb connected`);
}).catch(err => console.log(err))


app.listen(3000, () => {
    console.log(`Server is running on port ${3000}`);
})