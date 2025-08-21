import mongoose from 'mongoose';

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        
    },
    profilePicture:{
        type:String,
        default:"https://www.lasalle.edu/wp-content/uploads/2023/03/default-profile-photo-30-300x300.png"
    }
    
},{timestamps:true});

const User = mongoose.model('User',userSchema);

export default User;