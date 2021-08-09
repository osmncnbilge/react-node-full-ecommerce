import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { cartReducer } from "./reducers/cartReducers";
import Cookie from "js-cookie";
import {
  userRegisterReducer,
  userSigninReducer,
} from "./reducers/userReducers";
import {
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productSaveReducer,
} from "./reducers/productReducers";

const cartItems = Cookie.get("cartItems")
  ? JSON.parse(Cookie.get("cartItems"))
  : [];
const userInfo = Cookie.get("userInfo")
  ? JSON.parse(Cookie.get("userInfo"))
  : null;

const initialState = {
  cart: { cartItems: cartItems, shipping: {}, payment: {} },
  userSignin: { userInfo: userInfo },
};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  productSave: productSaveReducer,
  productDelete: productDeleteReducer,
});

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
