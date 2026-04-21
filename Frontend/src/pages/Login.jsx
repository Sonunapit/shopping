import { useForm } from "react-hook-form";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { asyncLoginUser } from "../store/actions/userAction";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useState } from "react";

const Login = () => {
  const { register, reset, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false);
  const LoginHandler = (user) => {
    
    dispatch(asyncLoginUser(user));
    navigate("/")
    toast.success("Login User !")

    
  };

  return (
  <div className="min-h-screen flex items-center mt-0 justify-center ">
    
      <div className="w-full md:w-[50%] lg:w-[30%] bg-white p-8 md:p-10 shadow-2xl rounded-2xl transition-all duration-300 hover:shadow-gray-300">
        
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-4xl font-extrabold text-gray-950 tracking-tight">Login</h2>
          <p className="text-gray-500 mt-2 font-medium">Please sign in to continue</p>
        </div>
        
        <form className="flex flex-col space-y-6" onSubmit={handleSubmit(LoginHandler)}>
          
          {/* Email Input Group */}
          <div className="group relative">
            <label className="text-xs uppercase tracking-widest text-gray-400 font-bold ml-1 transition-colors group-focus-within:text-blue-600">
              Email Address
            </label>
            <div className="flex items-center border-b-2 border-gray-200 group-focus-within:border-gray-950 transition-all duration-300">
              <Mail className="text-gray-400 group-focus-within:text-gray-950" size={20} />
              <input
                {...register("email")}
                className="w-full text-xl outline-0 p-3 bg-transparent placeholder:text-gray-300"
                type="email"
                placeholder="sonu123@gmai.com"
                required
              />
            </div>
          </div>

          {/* Password Input Group */}
          <div className="group relative">
            <label className="text-xs uppercase tracking-widest text-gray-400 font-bold ml-1 transition-colors group-focus-within:text-blue-600">
              Password
            </label>
            <div className="flex items-center border-b-2 border-gray-200 group-focus-within:border-gray-950 transition-all duration-300">
              <Lock className="text-gray-400 group-focus-within:text-gray-950" size={20} />
              <input
                {...register("password")}
                className="w-full text-xl outline-0 p-3 bg-transparent placeholder:text-gray-300"
                type={showPassword ? "text" : "password"}
                placeholder="xsdts677sx"
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-950 transition-colors p-2"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button 
            type="submit"
            className="group mt-4 flex items-center justify-center gap-3 px-3 py-4 font-bold bg-gray-950 text-white rounded-xl hover:bg-gray-800 transition-all active:scale-[0.97] shadow-lg shadow-gray-400/50"
          >
            Login User
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </button>

          {/* Register Link */}
          <p className="text-center mt-6 text-gray-500 font-medium">
            Don't have a account?{" "}
            <a href="/register" className="text-blue-700 font-bold hover:text-blue-800 hover:underline transition-all">
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
