import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  getAllProductsReducer,
  getProductByIdReducer,
  addProductReviewReducer,
  deleteProductReviewReducer,
} from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  registerNewUserReducer,
  loginUserReducer,
  logoutUserReducer,
  deleteUserReducer,
  getUserProfileByIdReducer,
  getUserByIdReducer,
  updateProfileReducer,
  changePasswordReducer,
  deleteUserAccountReducer,
} from "./reducers/userReducer";
import {
  placeOrderReducer,
  getOrdersByUserIDReducer,
  getOrderDescByIDReducer,
} from "./reducers/orderReducer";
import { userProfileUpdateReducer } from "./reducers/userProfileReducer";

const finalReducer = combineReducers({
  getAllProductsReducer: getAllProductsReducer,
  getProductByIdReducer: getProductByIdReducer,
  cartReducer: cartReducer,
  registerNewUserReducer: registerNewUserReducer,
  loginUserReducer: loginUserReducer,
  logoutUserReducer: logoutUserReducer,
  deleteUserReducer: deleteUserReducer,
  getUserProfileByIdReducer: getUserProfileByIdReducer,
  getUserByIdReducer: getUserByIdReducer,
  updateProfileReducer: updateProfileReducer,
  changePasswordReducer: changePasswordReducer,
  deleteUserAccountReducer: deleteUserAccountReducer,
  placeOrderReducer: placeOrderReducer,
  getOrdersByUserIDReducer: getOrdersByUserIDReducer,
  getOrderDescByIDReducer: getOrderDescByIDReducer,
  addProductReviewReducer: addProductReviewReducer,
  deleteProductReviewReducer: deleteProductReviewReducer,
  userProfileUpdateReducer: userProfileUpdateReducer,
});

// load cart items from localStorage and if no item is found initialize an empty array
const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

// get the currently logged-in user
const currentUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  loginUserReducer: { currentUser: currentUser },
  cartReducer: { cartItems: cartItems },
};

const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options
});

const store = createStore(
  finalReducer,
  initialState,
  composeEnhancers(
    applyMiddleware(thunk)
    // other store enhancers if any
  )
);

export default store;
