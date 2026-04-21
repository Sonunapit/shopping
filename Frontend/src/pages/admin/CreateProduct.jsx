import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asynccreateproduct } from "../../store/actions/productAction";
import { toast } from "react-toastify";
import { Image, Tag, IndianRupee, FileText, LayoutGrid, PlusCircle } from 'lucide-react';

const CreateProduct = () => {
  const { register, reset, handleSubmit,watch } = useForm();
    const imageUrl = watch("image");

  const dispatch = useDispatch();
  const navigate = useNavigate()
  

  const CreateProductHandler = (product) => {
    product.id = nanoid();
    console.log(product)
    dispatch(asynccreateproduct(product))
    navigate("/products")
    toast.success("Product Created !")

  };

  return (
     <div className="min-h-screen  flex items-center justify-center p-4 sm:p-6 lg:p-10 font-sans">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Live Preview (Hidden on mobile or shown at top) */}
        <div className="w-full md:w-2/5 bg-gray-950 p-8 flex flex-col justify-center items-center text-white text-center">
          <h3 className="text-xl font-bold mb-6 opacity-80 uppercase tracking-widest text-sm">Preview</h3>
          <div className="w-full aspect-square rounded-2xl border-2 border-dashed border-gray-700 overflow-hidden flex items-center justify-center bg-gray-900 shadow-inner">
            {imageUrl ? (
              <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => e.target.src = "https://via.placeholder.com/300?text=Invalid+URL"} />
            ) : (
              <div className="flex flex-col items-center text-gray-500">
                <Image size={48} strokeWidth={1} />
                <p className="mt-2 text-xs">Image will appear here</p>
              </div>
            )}
          </div>
          <div className="mt-6 w-full space-y-2">
            <div className="h-4 bg-gray-800 rounded w-3/4 mx-auto animate-pulse"></div>
            <div className="h-4 bg-gray-800 rounded w-1/2 mx-auto animate-pulse"></div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-3/5 p-7 sm:p-10">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Add Product</h2>
            <p className="text-gray-500 text-sm">Fill in the details to list a new item</p>
          </div>

          <form onSubmit={handleSubmit(CreateProductHandler)} className="space-y-5">
            
            {/* Image URL Input */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">Image URL</label>
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 focus-within:ring-2 focus-within:ring-gray-900 transition-all">
                <Image className="text-gray-400" size={18} />
                <input 
                  className="w-full p-3 bg-transparent outline-none text-sm font-semibold"
                  {...register("image")} 
                  type="url" 
                  placeholder="https://example.com/image.jpg" 
                  required
                />
              </div>
            </div>

            {/* Title Input */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">Product Title</label>
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 focus-within:ring-2 focus-within:ring-gray-900 transition-all">
                <Tag className="text-gray-400" size={18} />
                <input
                  className="w-full p-3 bg-transparent outline-none text-sm font-semibold"
                  {...register("title")} 
                  type="text" 
                  placeholder="Enter a catchy title" 
                  required
                />
              </div>
            </div>

            {/* Price and Category Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Price (₹)</label>
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 focus-within:ring-2 focus-within:ring-gray-900 transition-all">
                  <IndianRupee className="text-gray-400" size={18} />
                  <input
                    className="w-full p-3 bg-transparent outline-none text-sm font-semibold"
                    {...register("price")} 
                    type="number" 
                    step="0.01"
                    placeholder="123.89" 
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Category</label>
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 focus-within:ring-2 focus-within:ring-gray-900 transition-all">
                  <LayoutGrid className="text-gray-400" size={18} />
                  <input
                    className="w-full p-3 bg-transparent outline-none text-sm font-semibold"
                    {...register("category")}
                    type="text"
                    placeholder="Electronics, Fashion..."
                    required
                  />
                </div>
              </div>
            </div>

            {/* Description Textarea */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">Description</label>
              <div className="flex items-start bg-gray-50 border border-gray-200 rounded-xl px-3 pt-3 focus-within:ring-2 focus-within:ring-gray-900 transition-all">
                <FileText className="text-gray-400 mt-1" size={18} />
                <textarea
                  className="w-full p-2 bg-transparent outline-none text-sm font-semibold min-h-[100px] resize-none"
                  {...register("description")}
                  placeholder="Tell customers about your product..."
                  required
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <button className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-white bg-gray-950 hover:bg-black transition-all active:scale-[0.98] shadow-xl shadow-gray-200 font-bold mt-4">
              <PlusCircle size={20} />
              Create Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
