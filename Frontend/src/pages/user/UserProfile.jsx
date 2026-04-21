import { useForm } from "react-hook-form"
import {useDispatch, useSelector} from "react-redux"
import { useNavigate } from "react-router-dom";
import { asyncdeleteuser, asynclogoutuser, asyncupdateuser } from "../../store/actions/userAction";
import { toast } from "react-toastify";
import { User, Mail, Lock, LogOut, Trash2, Save, Settings } from 'lucide-react';



const UserProfile = () => {

    const {
      userReducer:{users},

    }= useSelector((state)=>state);

    const {register,reset,handleSubmit} = useForm({

      defaultValues:{
        username: users?.username,
        email:users?.email,
        password:users?.password
      }
    })

    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const UpdateUserHandler = (user)=>{
      dispatch(asyncupdateuser(users.id,user))
      toast.success("Updated User!")
    }

    const  LogoutUserhandler = () => {
      dispatch(asynclogoutuser())
      navigate("/Login")
    }
      

    const DeleteHandler = ()=>{
      navigate("/Login")
      dispatch(asyncdeleteuser(users.id))
      toast.error('deleted User !')
    }


  return  users ? (
   <div className="min-h-screen flex items-center justify-center  font-sans">
    
      <div className="w-full sm:max-w-xl md:w-[70%] lg:w-[40%] bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-500">
        
        {/* Header Section */}
        <div className="bg-gray-900 p-6 text-white flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Settings size={20} className="animate-spin-slow" />
              Account Settings
            </h2>
            <p className="text-gray-400 text-xs mt-1">Manage your personal information</p>
          </div>
          <div className="h-10 w-10 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700">
            <User size={20} className="text-gray-300" />
          </div>
        </div>

        <form onSubmit={handleSubmit(UpdateUserHandler)} className="p-6 sm:p-10 space-y-6">
          
          {/* Username Field */}
          <div className="space-y-2 group">
            <h1 className="text-sm font-bold text-gray-700 ml-1 transition-colors group-focus-within:text-gray-900">
              User Name
            </h1>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <User size={18} />
              </div>
              <input 
                {...register("username")}
                type="text"
                placeholder="Username"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all text-sm font-medium"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2 group">
            <h1 className="text-sm font-bold text-gray-700 ml-1 transition-colors group-focus-within:text-gray-900">
              Email Address
            </h1>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Mail size={18} />
              </div>
              <input 
                {...register("email")}
                type="email" 
                placeholder="xyz@gmail.com"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all text-sm font-medium"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2 group">
            <h1 className="text-sm font-bold text-gray-700 ml-1 transition-colors group-focus-within:text-gray-900">
              Security Password
            </h1>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Lock size={18} />
              </div>
              <input
                {...register("password")}
                type="password" 
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all text-sm font-medium"
              />
            </div>
          </div>

          {/* Action Buttons: Responsive Grid */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            
            {/* Update - Primary Action */}
            <button 
              type="submit"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-all active:scale-95 shadow-md order-1"
            >
              <Save size={18} />
              Update
            </button>

            {/* Logout - Secondary Action */}
            <button 
              type="button"
              onClick={LogoutUserhandler} 
              className="flex items-center justify-center gap-2 px-4 py-3 bg-emerald-100 text-emerald-700 font-bold rounded-xl hover:bg-emerald-200 transition-all active:scale-95 order-2"
            >
              <LogOut size={18} />
              Logout
            </button>

            {/* Delete - Danger Action */}
            <button 
              type="button"
              onClick={DeleteHandler} 
              className="flex items-center justify-center gap-2 px-4 py-3 bg-rose-50 text-rose-600 font-bold rounded-xl hover:bg-rose-100 transition-all active:scale-95 border border-rose-100 sm:col-span-2 lg:col-span-1 order-3"
            >
              <Trash2 size={18} />
              Delete
            </button>
          </div>
        </form>
        
        <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
            Secure Profile Management System
          </p>
        </div>
      </div>
    </div>
  ): "Loading";
}

export default UserProfile