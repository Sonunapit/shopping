import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { asyncupdateuser } from "../store/actions/userAction";
import { useEffect, useState } from "react";
import axios from "../api/axioconfig";
import InfiniteScroll from "react-infinite-scroll-component";

const Products = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userReducer.users);
  //const products = useSelector((state)=> state.productReducer.products)

  const [products, setproducts] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchproducts = async () => {
    try {
      const res = await axios.get(`/products?_page=${page}&_per_page=6`);

      const newProducts = res.data.data;

      

      if (newProducts.length > 0) {
        setproducts((prev) => [...prev, ...newProducts]);
        setPage((prev) => prev + 1);
      } else {
        sethasMore(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchproducts();
  }, []);

  const AddtoCardHandler = (product) => {
    const copyuser = { ...users, cart: [...(users.cart || [])] };

    const x = copyuser.cart.findIndex((c) => c?.product?.id == product.id);

    if (x == -1) {
      copyuser.cart.push({ product, quantity: 1 });
    } else {
      copyuser.cart[x] = {
        product,
        quantity: copyuser.cart[x].quantity + 1,
      };
    }

    dispatch(asyncupdateuser(copyuser.id, copyuser));
  };

  const rederproduct = products.map((product) => {
    return (
      <div
        className="w-full p-1 gap-2  border shadow rounded-lg bg-white "
        key={product.id}
      >
        <img
          className="w-full aspect-video  object-cover rounded-t-sm"
          src={product.image}
          alt=""
        />
        <div className="mt-2 px-1">
          <h1 className="font-semibold md:font-semibold tetxt-lg text-gray-800 line-clamp-1 ">
            {product.title}
          </h1>
          <small className="font-semibold text-gray-500 black ">
            {product.description.slice(0, 100)}
          </small>
          <p className="text-2xl font-black mt-2 text-gray-900">
            ₹{product.price}
          </p>
        </div>

        <div className="p-3 mt-3 flex justify-between items-center gap-2">
          <Link
            className="px-2 py-2 bg-green-700 rounded text-white  text-sm flex items-center gap-1 hover:bg-green-800 transition-colors flex-1 justify-center"
            to={`/product/${product.id}`}
          >
            More Info
          </Link>

          <button
            className="px-2 py-2 bg-gray-700 rounded text-white text-sm flex items-center gap-1 hover:bg-gray-800 transition-colors flex-1 justify-center"
            onClick={() => AddtoCardHandler(product.id)}
          >
            Add to Card
          </button>
        </div>
      </div>
    );
  });

  return products.length > 0 ? (
    <div className=" ">
      <InfiniteScroll
        className=" flex flex-col gap-2 w-full overflow-hidden md:grid grid-cols-3  "
        dataLength={products.length}
        next={fetchproducts}
        loader={<h4>Loading...</h4>}
        hasMore={hasMore}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {rederproduct}
      </InfiniteScroll>
    </div>
  ) : (
    "loading.."
  );
};

export default Products;
