import express from 'express';
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";

const app=express();
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})

connectDB();
