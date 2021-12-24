// import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import SellerDashboard from "./pages/SellerDashboard";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
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
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
