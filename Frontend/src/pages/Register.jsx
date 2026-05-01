import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { asyncregisteruser } from "../store/actions/userAction";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, UserPlus } from "lucide-react";

const Register = () => {
  const { register, reset, handleSubmit } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // ✅ FIXED HANDLER
  const RegisterHandler = async (user) => {
    const [firstName, lastName] = user.username.split(" ");

    const newUser = {
      username: user.username,
      email: user.email,
      password: user.password,
      fullName: {
        firstName: firstName || user.username,
        lastName: lastName || "User",
      },
    };

    try {
      await dispatch(asyncregisteruser(newUser));
      toast.success("User Registered Successfully!");
      navigate("/login");
      reset();
    } catch (error) {
      toast.error("Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full sm:max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300">
        <div className="h-2 bg-gray-900 w-full"></div>

        <div className="p-6 sm:p-8">
          <div className="mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
              Create Account
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Join our community today
            </p>
          </div>

          <form onSubmit={handleSubmit(RegisterHandler)}>
            {/* Name */}
            <div className="mb-6">
              <label className="text-xs text-gray-400 font-bold block mb-1">
                Full Name
              </label>
              <div className="flex items-center border-b-2 py-2">
                <User className="mr-2" size={18} />
                <input
                  {...register("username")}
                  className="w-full outline-none"
                  type="text"
                  placeholder="Enter your name"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-6">
              <label className="text-xs text-gray-400 font-bold block mb-1">
                Email
              </label>
              <div className="flex items-center border-b-2 py-2">
                <Mail className="mr-2" size={18} />
                <input
                  {...register("email")}
                  className="w-full outline-none"
                  type="email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="text-xs text-gray-400 font-bold block mb-1">
                Password
              </label>
              <div className="flex items-center border-b-2 py-2 relative">
                <Lock className="mr-2" size={18} />
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  className="w-full outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button className="w-full bg-black text-white py-3 rounded-lg">
              <UserPlus size={16} className="inline mr-2" />
              Register
            </button>

            <div className="text-center mt-6">
              <p className="text-sm">Already have an account?</p>
              <a href="/login" className="text-blue-600 font-bold">
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
