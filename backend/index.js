import express from 'express';
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth-route.js";

const app=express();
connectDB();
app.use(express.json());

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})

app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api/auth",authRoutes);


