import "./App.css";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
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
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDescription />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/reviews" element={<Reviews />} />

        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {user && (
          <>
            {/* <Route path="/order-summary" element={<OrderSummary />} /> */}
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/edit-profile/:userId" element={<EditProfile />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/delete-account" element={<DeleteAccount />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-summary" element={<OrderSummary />} />
            <Route path="/payment-canceled" element={<PaymentCanceled />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/order-details/:order_id" element={<OrderDetails />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
