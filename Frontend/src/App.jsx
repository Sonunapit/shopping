import { useEffect } from "react";
import Navbar from "./component/Navbar";
import BottomNav from "./component/MobileBottomNav";
import Mainroutes from "./routes/Mainroutes";
import { asynccurrentuser } from "./store/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadproduct } from "./store/actions/productAction";

const App = () => {
  const dispatch = useDispatch();
  const {users} = useSelector((state) => state.userReducer)
  const {products} = useSelector((state) => state.productReducer)

  useEffect(() => {
    !users && dispatch(asynccurrentuser())
    
  }, [users]);

    useEffect(() => {
      products.length == 0 && dispatch(asyncloadproduct())  
  }, [products]);

   const user = {
    role: "user", 
  };

  return (
    <div className=" w-screen h-screen  px-[10%] ">
      <Navbar />
      <Mainroutes />
      <BottomNav user={user} />
    </div>
  );
};

export default App;
