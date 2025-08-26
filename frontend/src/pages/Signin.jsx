import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import houseImage from '../assets/House.png';
import { useNavigate, Link } from 'react-router-dom';
import { axiosInstance } from '../config/api';
import { signInStart, signInSuccess, signInFailuer  } from   '../features/userSlice';
import {useDispatch,useSelector} from 'react-redux';
import {GoogleAuthProvider,getAuth,signInWithPopup} from 'firebase/auth';
import {app} from '../firebase';


const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors,setErrors]=useState({});
  const {loading, error}=useSelector((state)=>state.user);
  const [alert, setAlert] = useState("");
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
 const handleGoogleClick = async ()=>{
  try{
     const provider=new GoogleAuthProvider();
     const auth=getAuth(app);
     const result=await signInWithPopup(auth,provider)
     console.log(result);
     const res= await axiosInstance.post('/api/auth/google-sign-in',{
      name:result.user.displayName,
      email:result.user.email,
      image:result.user.photoURL
     })
     console.log(res);
     if(res.data.success){
        dispatch(signInSuccess(res.data.user))
     }
     console.log(result);
  }
  catch(error){
    console.log(error);

  }
 }
  const validateForm = () => {
    let newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      dispatch(signInStart());
      const res=await axiosInstance.post('/api/auth/sign-in',formData);
      console.log(res.data);
      if(res.data.success){
        dispatch(signInSuccess(res.data.user));
        navigate('/home', { replace: true });
      }
      else{
        dispatch(signInFailuer(res.data.message || "Network error"));
        setAlert(res.data.message);
       
      }
      
    } catch (error) {
      dispatch(signInFailuer(error?.response?.data?.message || "Network error"));
      setAlert("Error signing in. Please try again.");
    }
  };

  return (
    <div
      className="h-dvh bg-fixed bg-cover bg-center"
      style={{ backgroundImage: `url(${houseImage})` }}
    >
      <div className="relative flex flex-col lg:flex-row h-dvh bg-black/50">
        
        <div className="flex-1 flex flex-col justify-center p-10 text-white">
          <h1 className="text-6xl font-light mb-6 leading-tight animate-fade-in">
            Welcome Back!
          </h1>
          <p className="text-2xl mb-10 opacity-90 font-light">
            Sign in to continue
          </p>
          <p className="text-lg leading-relaxed opacity-80">
            Access your account to explore premium properties, manage your profile, 
            and find your dream home with Dream Home Estate.
          </p>
        </div>

        
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-10 border border-white/30 shadow-2xl w-full max-w-lg">
            <h2 className="text-3xl font-semibold text-white mb-6 text-center">
              Sign In
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
            
              <div>
                <label htmlFor="email" className="block text-white text-sm mb-2">
                  Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@gmail.com"
                    className="w-full bg-white/10 border border-white/30 rounded-xl px-12 py-3 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all duration-300"
                  />
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />
                </div>
                {errors.email && <p className="text-red-300 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-white text-sm mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full bg-white/10 border border-white/30 rounded-xl px-12 py-3 pr-12 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all duration-300"
                  />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-300 text-sm mt-1">{errors.password}</p>}
              </div>

             
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium py-3 px-6 rounded-xl transition-transform duration-300 transform hover:scale-105 shadow-lg"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>

            
              {alert && <p className="text-red-300 w-full text-center mt-2">{alert}</p>}
            </form>

           
            <div className="flex items-center my-6">
              <div className="flex-grow h-px bg-white/30"></div>
              <span className="px-4 text-white/70 text-sm">OR</span>
              <div className="flex-grow h-px bg-white/30"></div>
            </div>

            
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 font-medium py-3 px-6 rounded-xl shadow hover:bg-gray-100 transition cursor-pointer"
              onClick={handleGoogleClick}
            >
              <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5" />
              Sign in with Google
            </button>

           
            <div className="text-center mt-6">
              <span className="text-white/70 text-sm">
                Don’t have an account?{" "}
                <Link to="/sign-up" className="text-blue-300 hover:text-blue-400 underline cursor-pointer">
                  Sign Up
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
