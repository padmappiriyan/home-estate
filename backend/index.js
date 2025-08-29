import express from 'express';
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth-route.js";

import cookieParser from 'cookie-parser';
import userRoutes from './routes/user-route.js';
import cors from "cors";

const app=express();
connectDB();

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,               
}));

app.use(express.json());
app.use(cookieParser());

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})



app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);

app.use((err,req,res,next)=>{
    const statuscode=err.statuscode || 500;
    const message=err.message || "Internal sever error";
    return res.status(statuscode).json({
        success:false,
        statuscode,
        message,
    })
});

