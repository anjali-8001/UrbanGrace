const ProductReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "SET_PRODUCTS":
      return {
        ...state,
        isLoading: false,
        products: action.payload,
      };
    case "SET_FEATURED_PRODUCTS":
      return {
        ...state,
        isLoading: false,
        featuredProducts: action.payload,
      };
    case "API_ERROR":
      return {
        ...state,
        isLoading: false,
        IsError: true,
      };
    case "SET_SINGLE_LOADING":
      return {
        ...state,
        isSingleLoading: true,
      };
    case "SET_SINGLE_PRODUCT":
      return {
        ...state,
        isSingleLoading: false,
        singleProduct: action.payload,
      };

    case "SET_SINGLE_ERROR":
      return {
        ...state,
        isSingleLoading: false,
        IsError: true,
      };

    default:
      return state;
  }
};

export default ProductReducer;
