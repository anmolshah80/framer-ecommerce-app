import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SellerDashboard from "./pages/SellerDashboard";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  // to be updated later
  const user = true;

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
