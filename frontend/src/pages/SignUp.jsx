import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import houseImage from '../assets/House.png';
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    agreeToTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setloading] = useState(false);
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  
  const validateForm = () => {
    let newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms & conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setloading(true);
      const res = await axios.post('/api/auth/sign-up', formData);
      if (res.data.success) {
        console.log("user created successfully");
      } else {
        console.log(res.data.message || "Something went wrong");
      }
      setloading(false);
    } catch (error) {
      setloading(false);
      console.error(error);
      alert("Error signing up. Please try again.");
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
            Welcome!
          </h1>
          <p className="text-2xl mb-10 opacity-90 font-light">
            To Our Website
          </p>
          <p className="text-lg leading-relaxed opacity-80">
            Discover your dream home with Dream Home Estate. We offer premium
            properties, personalized services, and expert guidance to help you
            find the perfect place to call home.
          </p>
        </div>

       
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-10 border border-white/30 shadow-2xl w-full max-w-lg">
            <h2 className="text-3xl font-semibold text-white mb-6 text-center">
              Create Account
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div>
                <label htmlFor="username" className="block text-white text-sm mb-2">
                  Username
                </label>
                <div className="relative">
                  <input
                    id="username"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Enter username"
                    className="w-full bg-white/10 border border-white/30 rounded-xl px-12 py-3 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all duration-300"
                  />
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />
                </div>
                {errors.username && <p className="text-red-300 text-sm mt-1">{errors.username}</p>}
              </div>

           
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

             
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-500 bg-white/20 border-white/30 rounded focus:ring-2 focus:ring-blue-400"
                />
                <label className="text-white/80 text-sm">
                  I agree to the terms & conditions
                </label>
              </div>
              {errors.agreeToTerms && <p className="text-red-300 text-sm">{errors.agreeToTerms}</p>}

             
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium py-3 px-6 rounded-xl transition-transform duration-300 transform hover:scale-105 shadow-lg"
              >
                {loading ? "creating account.." : "sign up"}
              </button>
            </form>

            <div className="text-center mt-6">
              <span className="text-white/70 text-sm">
                Already have an account?{" "}
                <a href="#" className="text-blue-300 hover:text-blue-400 underline">
                  Login
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

