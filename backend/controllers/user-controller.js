import User from '../models/user-model.js'
import bcrypt from 'bcryptjs';

export const updateUser = async (req,res,next)=>{
      if(req.user._id!==req.params.id){
           return res.status(200).json({
            success:false,
            message:"you can only update your own account"
           })
      }
      try{
         
         const updateUser= await User.findByIdAndUpdate(req.params.id,{
            $set:{
                username:req.body.username,
                email:req.body.email,
                profilePicture:req.body.profilePicture
            }
         },{new:true});
         
         return res.status(200).json({
            success:true,
            message:"User Updated successfully",
            user:{
                username:updateUser.username,
                email:updateUser.email
            }
         })
      }
      catch(error){
        next(error);
      }
}

export const updatePassword = async(req,res,next)=>{
     if(req.user._id!==req.params.id){
           return res.status(200).json({
            success:false,
            message:"you can only update your own account"
           })
      }
      try{
        if(req.body.password){
            req.body.password=bcrypt.hashSync(req.body.password,10);
        }
        else{
           return res.json({
                success:false,
                message:"Password is missing"
            })
        }
        const updatedUser=  await User.findByIdAndUpdate(req.params.id,{
            $set:{
                password:req.body.password
            }
        },{new:true});

        return res.json({
            success:true,
            message:"user updated Password successfully"
        })
       

      }
      catch(error){
        next(error);
      }
}


