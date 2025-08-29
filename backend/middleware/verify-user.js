import jwt from 'jsonwebtoken';

export const verify_token = async(req,res,next)=>{
    
    try{
        const token =req.cookies.access_token;
       
      if(!token){

       return res.json({
            success:false,
            message:"Unauthorized"
            })
      }
      jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        if(err){
            return res.json({
                success:false,
                message:"token is invalid"
            })
        }
         req.user=decoded;
         
         next();
      })
     
      
    }
    catch(error){
        
        next(error);
    }
      
}