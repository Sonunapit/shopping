import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ShoppingBag, Search } from "lucide-react"; 
import MobileBottomNav from "./MobileBottomNav";

const Navbar = () => {
  const navigate = useNavigate();
  
  const user = useSelector((state) => state.userReducer.users);

  
  const navLinkClass = ({ isActive }) =>
    `transition-colors ${
      isActive ? "text-gray-900 font-semibold" : "text-gray-500 hover:text-gray-900"
    }`;

  return (
    <>
      
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-200 hidden md:block ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <div className="bg-gray-800 p-2 rounded-lg">
                <ShoppingBag className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">
                LUXE.
              </span>
            </div>

            
            <div className="flex space-x-8">
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>

              {user ? (
                <>
                  {user?.isAdmin && (
                    <NavLink to="/admin/create-product" className={navLinkClass}>
                      Create Product
                    </NavLink>
                  )}
                  <NavLink to="/admin/user-profile" className={navLinkClass}>
                    Settings
                  </NavLink>
                  <NavLink to="/card" className={navLinkClass}>
                    Cart
                  </NavLink>
                </>
              ) : (
                <NavLink to="/login" className={navLinkClass}>
                  Login
                </NavLink>
              )}
            </div>

            
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                <Search size={20} />
              </button>

              {user ? (
                <button
                  onClick={() => navigate("/admin/user-profile")}
                  className="bg-gray-800 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-black transition-all"
                >
                  Profile
                </button>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="bg-gray-800 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-black transition-all"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      
      <div className="hidden md:block h-16"></div>

      
      <MobileBottomNav />
    </>
  );
};

export default Navbar;
