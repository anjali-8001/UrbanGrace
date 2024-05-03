import { createContext, useContext, useEffect, useReducer } from "react";
import CartReducer from "../Reducers/cart";
import { useAuth } from "./auth";
import axios from "axios";
import toast from "react-hot-toast";

const CartContext = createContext();

const initialState = {
  cart: [],
  totalItems: "",
  totalPrice: "",
  isError: false,
  isLoading: false,
  // shippingFees:
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);
  const [auth] = useAuth();

  const getCart = async () => {
    if (auth?.user) {
      try {
        dispatch({ type: "SET_LOADING" });
        const res = await axios.post(
          `${process.env.REACT_APP_API}/cart/get-cart`,
          {
            user: auth?.user,
          },
          {
            headers: {
              Authorization: auth?.token,
            },
          }
        );
        if (res?.data.success) {
          const cart = res.data.cart;
          dispatch({
            type: "SET_CART",
            cart: cart.products,
            totalItems: cart.products.length,
            totalPrice: cart.bill,
          });
        }
      } catch (error) {
        console.log(error);
        dispatch({ type: "API_ERROR" });
      }
    } else {
      // localStorage.getItem(cart);
      // setCart(cart);
    }
  };

  const addProductToCart = async (productId, quantity, size) => {
    if (auth?.user) {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API}/cart/add-product`,
          {
            user: auth?.user,
            productId: productId,
            quantity: quantity,
            size: size,
          },
          {
            headers: {
              Authorization: auth?.token,
            },
          }
        );
        if (res?.data.success) {
          const cart = res.data.cart;
          dispatch({
            type: "SET_CART",
            cart: cart.products,
            totalItems: cart.products.length,
            totalPrice: cart.bill,
          });
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    } else {
    }
  };

  const deleteProductFromCart = async (productId, size) => {
    if (auth?.user) {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API}/cart/delete-product`,
          {
            user: auth?.user,
            productId: productId,
            size: size,
          },
          {
            headers: {
              Authorization: auth?.token,
            },
          }
        );
        if (res?.data.success) {
          const cart = res.data.cart;
          dispatch({
            type: "SET_CART",
            cart: cart.products,
            totalItems: cart.products.length,
            totalPrice: cart.bill,
          });
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    getCart();
  }, [auth]);

  useEffect(() => {
    // console.log(auth);
    // console.log(state);
  }, [state, auth]);
  return (
    <CartContext.Provider value={{ ...state, addProductToCart,deleteProductFromCart,getCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
