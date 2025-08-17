import bcrypt from 'bcryptjs';
import User from "../models/user-model.js";

export const signUp =async (req,res,next)=>{
     console.log("sign up");
      const {username,email,password}=req.body;
      console.log(req.body);
      const hasPassword=bcrypt.hashSync(password,10);
      const newUser= new User({username,email,password:hasPassword});
      try{
          await newUser.save();
          res.json({
        status:"success",
        message:"User created successfully"
      })
      }
      catch(error){
        next(error);
      }
      
}
