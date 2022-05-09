import "./App.css";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
// import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import ProductDescription from "./pages/productDescription/ProductDescription";
import OrderSummary from "./pages/cart/Cart";
import UserProfile from "./pages/userProfile/UserProfile";
import EditProfile from "./pages/editProfile/EditProfile";
import ChangePassword from "./pages/changePassword/ChangePassword";
import DeleteAccount from "./pages/deleteAccount/DeleteAccount";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import PaymentCanceled from "./pages/paymentCanceled/PaymentCanceled";
import Orders from "./pages/orders/Orders";
import OrderDetails from "./pages/orderDetails/OrderDetails";
import Reviews from "./components/reviews/Reviews";
import DeleteReview from "./pages/deleteReview/DeleteReview";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const currentUserState = useSelector((state) => state.loginUserReducer);

  const { currentUser } = currentUserState;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDescription />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/reviews" element={<Reviews />} />

        <Route
          path="/register"
          element={currentUser !== null ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/login"
          element={currentUser !== null ? <Navigate to="/" /> : <Login />}
        />
        {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}

        {/* <Route path="/order-summary" element={<OrderSummary />} /> */}
        <Route
          path="/user-profile"
          element={
            currentUser !== null ? <UserProfile /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/edit-profile/:userId"
          element={
            currentUser !== null ? <EditProfile /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/change-password"
          element={
            currentUser !== null ? <ChangePassword /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/delete-account"
          element={
            currentUser !== null ? <DeleteAccount /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/checkout"
          element={
            currentUser !== null ? <Checkout /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/order-summary"
          element={
            currentUser !== null ? <OrderSummary /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/payment-canceled"
          element={
            currentUser !== null ? (
              <PaymentCanceled />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/orders"
          element={currentUser !== null ? <Orders /> : <Navigate to="/login" />}
        />
        <Route
          path="/order-details/:order_id"
          element={
            currentUser !== null ? <OrderDetails /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/delete-review/:productId"
          element={
            currentUser !== null ? <DeleteReview /> : <Navigate to="/login" />
          }
        />

        {/* redirect the user to home page when a path specified does not exist */}
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
