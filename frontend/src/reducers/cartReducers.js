import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT,
  CART_SAVE_SHIPPING,
} from "../constants/cartConstants";

const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const product = state.cartItems.find((x) => x.product === item.product);
      if (product) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === product.product ? item : x
          ),
        };
      }
      return { ...state, cartItems: [...state.cartItems, item] };

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload
        ),
      };

    case CART_SAVE_SHIPPING:
      return { ...state, shipping: action.payload };

    case CART_SAVE_PAYMENT:
      return { ...state, payment: action.payload };

    default:
      return state;
  }
};

export { cartReducer };
