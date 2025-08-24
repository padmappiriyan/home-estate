import User from '../models/user-model.js'


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


