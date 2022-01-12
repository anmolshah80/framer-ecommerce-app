// import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import SellerDashboard from "./pages/SellerDashboard";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import ProductDescription from "./pages/productDescription/ProductDescription";
import OrderSummary from "./pages/orderSummary/OrderSummary";
import UserProfile from "./pages/userProfile/UserProfile";
import EditProfile from "./pages/editProfile/EditProfile";
import ChangePassword from "./pages/changePassword/ChangePassword";
import DeleteAccount from "./pages/deleteAccount/DeleteAccount";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./authContext/AuthContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        {user && (
          <>
            <Route path="/dashboard" element={<SellerDashboard />} />
            <Route path="/product/:id" element={<ProductDescription />} />
            <Route path="/order-summary" element={<OrderSummary />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/delete-account" element={<DeleteAccount />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
