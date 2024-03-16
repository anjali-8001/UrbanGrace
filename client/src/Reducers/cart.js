const CartReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "API_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case "SET_CART":
      return {
        ...state,
        isLoading: false,
        cart: action.cart,
        totalItems: action.totalItems,
        totalPrice: action.totalPrice,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };

    default:
      return state;
  }
};

export default CartReducer;
