import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Home, Plus, ShoppingCart, User, LogIn } from "lucide-react";

const MobileBottomNav = () => {
  const user = useSelector((state) => state.userReducer.users);

  return (
    <div className="fixed bottom-0 left-0 w-full h-16 bg-white border-t shadow-md flex justify-around items-center z-50 md:hidden">

      
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex flex-col items-center text-xs ${
            isActive ? "text-blue-600 scale-110" : "text-gray-900"
          }`
        }
      >
        <Home size={22} />
        <span>Home</span>
      </NavLink>

      {user ? (
        <>
          
          {user?.isAdmin && (
            <NavLink
              to="/admin/create-product"
              className={({ isActive }) =>
                `flex flex-col items-center text-xs ${
                  isActive ? "text-blue-600 scale-110" : "text-gray-900"
                }`
              }
            >
              <Plus size={22} />
              <span>Add</span>
            </NavLink>
          )}

          
          <NavLink
            to="/card"
            className={({ isActive }) =>
              `flex flex-col items-center text-xs ${
                isActive ? "text-blue-600 scale-110" : "text-gray-900"
              }`
            }
          >
            <ShoppingCart size={22} />
            <span>Cart</span>
          </NavLink>

          
          <NavLink
            to="/admin/user-profile"
            className={({ isActive }) =>
              `flex flex-col items-center text-xs ${
                isActive ? "text-blue-600 scale-110" : "text-gray-900"
              }`
            }
          >
            <User size={22} />
            <span>Profile</span>
          </NavLink>
        </>
      ) : (
        <NavLink
          to="/login"
          className={({ isActive }) =>
            `flex flex-col items-center text-xs ${
              isActive ? "text-blue-600 scale-110" : "text-gray-900"
            }`
          }
        >
          <LogIn size={22} />
          <span>Login</span>
        </NavLink>
      )}
    </div>
  );
};

export default MobileBottomNav;