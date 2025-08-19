import bcrypt from 'bcryptjs';
import User from "../models/user-model.js";
import validator from 'validator';
import jwt from 'jsonwebtoken';


export const signUp =async (req,res,next)=>{

     
      const {username,email,password}=req.body;
      const existingUser =await User.findOne({email});
     if(existingUser){
        return res.json({
          success:false,
          message:"User already exists with this email"
        })
      }

      if(!validator.isEmail(email)){
        return res.json({
          success:false,
          message:"Invalid email format"
     })}
     
      const hasPassword=bcrypt.hashSync(password,10);
      console.log(hasPassword);
      const newUser= new User(
        {username,email,password:hasPassword}
      );
      console.log(newUser);
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
export const signin=async (req,res,next)=>{
  try{
    const {email,password}=req.body;
   if(!email || !password){
    return res.json({
      success:false,
      message:"Email and Password are required"
    })
   }
   const existingUser = await User.findOne({email});
   if(!existingUser){
    return res.json({
      success:false,
      message:"User does not exist with this email"
    })
   }
   const isPasswordValid = bcrypt.compareSync(password,existingUser.password);
   if(!isPasswordValid){
    return res.json({
      success:false,
      message:"Invalid password"
    })
   }

   const token = jwt.sign({id:existingUser._id},process.env.JWT_SECRET);
   res.cookie("access_token",token,
    
     {
                httpOnly:true,
                secure:process.env.NODE_ENV === 'PRODUCTION',
                sameSite:process.env.NODE_ENV === 'PRODUCTION' ? 'none' :'strict',
                maxAge:7*24*60*60*1000
    }
  ).json({
    success:true,
    message:"User signed in successfully",
    user:{
      username:existingUser.username,
      email:existingUser.email
    }
  })



  }catch(error){
         next(error);
  }
   
  

}