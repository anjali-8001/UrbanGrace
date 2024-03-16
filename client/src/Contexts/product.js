import { createContext, useContext, useEffect, useReducer } from "react";
import ProductReducer from "../Reducers/product";
import axios from "axios";

const ProductContext = createContext();

const initialState = {
  isLoading: false,
  isError: false,
  products: [],
  featuredProducts: [],
  isSingleLoading: false,
  singleProduct: {},
};

const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProductReducer, initialState);

  const getFeaturedProducts = async () => {
    try {
      dispatch({ type: "SET_LOADING" });
      const res = await axios.get(
        `${process.env.REACT_APP_API}/product/get-featuredProducts`
      );
      if (res?.data.success) {
        const products = res.data.products;
        dispatch({ type: "SET_FEATURED_PRODUCTS", payload: products });
      }
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };

  const getSingleProduct = async (productId) => {
    try {
      dispatch({ type: "SET_SINGLE_LOADING" });
      const res = await axios.get(
        `${process.env.REACT_APP_API}/product/get-product/${productId}`
      );
      if (res?.data.success) {
        const product = res.data.product;
        dispatch({ type: "SET_SINGLE_PRODUCT", payload: product });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: "SET_SINGLE_ERROR" });
    }
  };

  useEffect(() => {
    getFeaturedProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ ...state, getSingleProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

const useProduct = () => useContext(ProductContext);

export { useProduct, ProductProvider };
