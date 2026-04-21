import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { asyncregisteruser } from "../store/actions/userAction";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, UserPlus } from 'lucide-react';

const Register = () => {
  const { register, reset, handleSubmit } = useForm();

  const dispatch = useDispatch();
  const naviagte = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
  const RegisterHandler = (user) => {
    user.id = nanoid();
    user.isAdmin = false,
    user.cart = [],
    dispatch(asyncregisteruser(user));
    naviagte("/login")
    toast.success("User Register !")

  };

  return (
   <div className="min-h-screen flex items-center justify-center  ">
     
      <div className="w-full sm:max-w-md  bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300">
        
        {/* Header decoration */}
        <div className="h-2 bg-gray-900 w-full"></div>
        
        <div className="p-6 sm:p-8">
          <div className="mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">Create Account</h2>
            <p className="text-gray-400 text-sm mt-1">Join our community today</p>
          </div>

          <form className="flex flex-col" onSubmit={handleSubmit(RegisterHandler)}>
            
            {/* Username Field */}
            <div className="group mb-5 sm:mb-6">
              <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold ml-1 mb-1 block group-focus-within:text-gray-900 transition-colors">
                Full Name
              </label>
              <div className="flex items-center border-b-2 border-gray-100 group-focus-within:border-gray-900 transition-all py-2">
                <User className="text-gray-300 group-focus-within:text-gray-900 mr-3 shrink-0" size={18} />
                <input
                  {...register("username")}
                  className="w-full outline-0 text-base sm:text-lg placeholder:text-gray-300 text-gray-800 bg-transparent"
                  type="text"
                  placeholder="Enter your name"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="group mb-5 sm:mb-6">
              <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold ml-1 mb-1 block group-focus-within:text-gray-900 transition-colors">
                Email Address
              </label>
              <div className="flex items-center border-b-2 border-gray-100 group-focus-within:border-gray-900 transition-all py-2">
                <Mail className="text-gray-300 group-focus-within:text-gray-900 mr-3 shrink-0" size={18} />
                <input
                  {...register("email")}
                  className="w-full outline-0 text-base sm:text-lg placeholder:text-gray-300 text-gray-800 bg-transparent"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="group mb-8">
              <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold ml-1 mb-1 block group-focus-within:text-gray-900 transition-colors">
                Password
              </label>
              <div className="flex items-center border-b-2 border-gray-100 group-focus-within:border-gray-900 transition-all py-2 relative">
                <Lock className="text-gray-300 group-focus-within:text-gray-900 mr-3 shrink-0" size={18} />
                <input
                  {...register("password")}
                  className="w-full outline-0 text-base sm:text-lg placeholder:text-gray-300 text-gray-800 pr-10 bg-transparent"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 text-gray-300 hover:text-gray-900 transition-colors p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button className="flex items-center justify-center gap-2 font-bold px-3 py-3.5 sm:py-4 rounded-xl text-white bg-gray-900 hover:bg-gray-800 transition-all active:scale-[0.98] shadow-lg shadow-gray-200 text-sm sm:text-base">
              <UserPlus size={18} />
              Register
            </button>
            
            {/* Footer Links */}
            <div className="mt-8 text-center">
              <p className="text-gray-500 text-sm font-medium">Already Have an Account?</p>
              <a href="/login" className="text-blue-800 text-xl sm:text-2xl font-bold hover:underline transition-all block mt-1">
                Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
