import { createStore, combineReducers, applyMiddleware } from "redux";
import {
  productDetailsReducer,
  productListReducer,
} from "./reducers/productReducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { cartReducer } from "./reducers/cartReducers";
import Cookie from "js-cookie";

const cartItems = JSON.parse(Cookie.get("cartItems")) || [];

const initialState = { cart: { cartItems: cartItems } };
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
});

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
