import { useDispatch, useSelector } from "react-redux";
import { asyncupdateuser } from "../store/actions/userAction";

const Card = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userReducer.users);
  const products = useSelector((state) => state.productReducer.products);

  const IncreaseQuantityHandler = (index, product) => {
    const copyuser = { ...users, cart: [...users.cart] };
    copyuser.cart[index] = {
      product,
      quantity: copyuser.cart[index].quantity + 1,
    };
    
    dispatch(asyncupdateuser(copyuser.id, copyuser));
  };

  const DecreaseQuantityHandler = (index, product) => {
    const copyuser = { ...users, cart: [...users.cart] };

    if (users.cart[index].quantity > 1) {
      copyuser.cart[index] = {
        
        ...copyuser.cart[index],
        quantity: copyuser.cart[index].quantity - 1,
      };
    } else {
      copyuser.cart.splice(index,1)
        
    }
    
     dispatch(asyncupdateuser(copyuser.id, copyuser))
  };

  const cartItems = users?.cart?.map((c, index) => {
    const product = products?.find((p) => p.id === c.product);

    if (!product) return null;

    return (
      <li
        className="   flex items-center justify-between mb-10  bg-gray-700 rounded text-white  p-2 "
        key={`${c.product}-${index}`}
      >
        <img
          className="w-[10vmax] h-[10vmax] object-cover"
          src={product.image}
          alt=""
        />
        <span>
          <h1>{product.title}</h1>
        </span>
        <span>
          <h2>{product.price}</h2>
        </span>
        <p>
          <button
            onClick={() => DecreaseQuantityHandler(index, c.product)}
            className="text-xl"
          >
            -
          </button>
          <span className="mx-3 p-1 rounded bg-gray-500 text-white">
            {" "}
            {c.quantity}{" "}
          </span>
          <button
            onClick={() => IncreaseQuantityHandler(index, c.product)}
            className="text-lg"
          >
            +
          </button>
        </p>
      </li>
    );
  });

  return (
    <div className=" mt-9  grid grid-cols-1   ">
      <ul>{cartItems}</ul>
    </div>
  );
};

export default Card;
