import { useForm } from "react-hook-form";
import React, { useState } from 'react';
import { ShoppingCart, Star, Share2, Heart, ShieldCheck, Truck, ArrowLeft } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { asyncdeleteproduct, asyncupdateproduct } from "../../store/actions/productAction";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);

  const {
    productReducer: {products},
    userReducer: {users}
  }
   = useSelector((state) => state);
  const product = products?.find((product) => product.id == id);
  

  const { register, reset, handleSubmit } = useForm({
    defaultValues: {
      image: product?.image,
      title: product?.title,
      price: product?.price,
      category: product?.category,
    },
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const UpdateProductHandler = (product) => {
    dispatch(asyncupdateproduct(id, product));
    toast.success("Updated product")
    
  };

  const deleteHandler = () => {
   dispatch(asyncdeleteproduct(id))
   console.log(id)
   navigate("/products")
   toast.error("Deleted Products")
  }

  
  return product ? (
    <>
     <div className="min-h-screen  mt-8 md:pb-8">
      
    

      <div className="max-w-7xl mx-auto md:pt-12 px-0 md:px-6">
        <div className="bg-white md:rounded-3xl md:shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
          
          
          <div className="w-full md:w-3/5 lg:w-1/2 relative bg-gray-100 flex items-center justify-center">
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-indigo-600 shadow-sm border border-indigo-100">
                New Arrival
              </span>
            </div>
            
            <img
              className="w-full h-auto aspect-square md:aspect-auto md:h-full object-cover"
              src={product.image}
              alt={product.title}
            />

            
            
          </div>

          
          <div className="w-full md:w-2/5 lg:w-1/2 p-6 md:p-12 lg:p-16 flex flex-col justify-center">
            <nav className="hidden md:flex gap-2 text-xs font-medium text-gray-400 mb-6 uppercase tracking-widest">
              <span>Electronics</span>
              <span>/</span>
              <span>Audio</span>
              <span>/</span>
              <span className="text-gray-900">{product.brand}</span>
            </nav>

            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center bg-yellow-50 px-2 py-1 rounded">
                <Star size={14} className="text-yellow-500 fill-current" />
                <span className="ml-1 text-sm font-bold text-yellow-700">{product.rating}</span>
              </div>
              <span className="text-sm text-gray-400 font-medium underline decoration-gray-200">
                {product.reviews} verified reviews
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
              {product.title}
            </h1>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex flex-col">
                <span className="text-4xl font-black text-gray-900">₹{product.price}</span>
                <div className="flex items-center gap-2">
                  <span className="text-lg text-gray-400 line-through">₹{product.oldPrice}</span>
                  <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                    {product.discount}
                  </span>
                </div>
              </div>
            </div>

            <div className="h-px bg-gray-100 w-full mb-8" />

            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
              {product.description}
            </p>

          
            <div className="hidden md:flex flex-col sm:flex-row gap-4 mb-8">
              <button className="flex-[2] flex items-center justify-center gap-3 px-8 py-5 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all hover:shadow-xl active:scale-95">
                <ShoppingCart size={22} />
                Add to Cart
              </button>
              <button className="flex-1 px-8 py-5 border-2 border-gray-200 text-gray-900 rounded-2xl font-bold hover:bg-gray-50 transition-all active:scale-95">
                Buy Now
              </button>
            </div>

          
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100/50">
                <Truck size={18} className="text-blue-600" />
                <span className="text-xs font-semibold text-blue-900">Free Delivery</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-indigo-50/50 rounded-xl border border-indigo-100/50">
                <ShieldCheck size={18} className="text-indigo-600" />
                <span className="text-xs font-semibold text-indigo-900">2 Year Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Sticky Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-lg border-t border-gray-100 z-50 flex items-center gap-4">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 font-bold uppercase tracking-tighter">Total Price</span>
          <span className="text-xl font-black text-gray-900">₹{product.price}</span>
        </div>
        <button className="flex-1 bg-gray-900 text-white font-bold py-4 rounded-xl shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2">
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </div>

      <div className="grid min-h-screen md:grid grid-cols-4  ">
        <card className="mx-auto w-full max-w-2xl p-6 lg:p-8  ">
          {users && users?.isAdmin &&
           <form
            className="space-y-6"
            onClick={handleSubmit(UpdateProductHandler)}
            
          >
            <input
              {...register("image")}
              type="url"
              placeholder="Enter your image URL"
            />

            <input
              {...register("title")}
              type="text"
              placeholder="Entr your title"
            />

            <input
              {...register("price")}
              type="text"
              placeholder="enter price $276.3"
            />
            <textarea
              className="font-semibold outline-1 mb-2 "
              {...register("description")}
              placeholder="Enter description"
            ></textarea>
            <input
              className="font-semibold outline-1"
              {...register("category")}
              type="text"
              placeholder="category name"
            />
            <div className="flex flex-row gap-2">
              <button className="px-4 py-2 bg-gray-900  rounded md:mr-5">
                Update
              </button>
              <button onClick={ deleteHandler}  className="px-4 py-2 bg-red-500 rounded ">Delete</button>
            </div>
          </form>
          
          }
         
        </card>
      </div>
    </>
  ) : (
    "loading"
  );
};

export default ProductDetails;
