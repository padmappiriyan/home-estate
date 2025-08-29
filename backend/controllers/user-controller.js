import User from '../models/user-model.js'
import bcrypt from 'bcryptjs';

export const updateUser = async (req,res,next)=>{
    
      if(req.user.id.toString() !== req.params.id){
           return res.status(200).json({
            success:false,
            message:"you can only update your own account"
           })
      }
      try{
         const imageUrl = req.file ? req.file.path : "https://www.lasalle.edu/wp-content/uploads/2023/03/default-profile-photo-30-300x300.png";
       
         const updateUser= await User.findByIdAndUpdate(req.params.id,{
            $set:{
                username:req.body.username,
                email:req.body.email,
                profilePicture:imageUrl
            }
         },{new:true});
         
         return res.status(200).json({
            success:true,
            message:"User Updated successfully",
            user:{
                username:updateUser.username,
                email:updateUser.email,
                profilePicture:updateUser.profilePicture,
                userId:updateUser._id
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


