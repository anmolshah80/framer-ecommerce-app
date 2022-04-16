import React from "react";
import "./login.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import Skeleton from "../../components/skeleton/Skeleton";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [open, setOpen] = useState(true);

  const [focusedUsernameField, setFocusedUsernameField] = useState(false);
  const [focusedPasswordField, setFocusedPasswordField] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginUserState = useSelector((state) => state.loginUserReducer);

  const { loading, success, error } = loginUserState;

  const handleLogin = (e) => {
    e.preventDefault();

    const user = {
      username: username,
      password: password,
    };

    dispatch(loginUser(user));
    setOpen(true);
  };

  success &&
    setTimeout(() => {
      navigate("/");
      window.location.reload();
    }, 3000);

  return (
    <div className="login">
      <div className="login__container">
        <div className="container__text">
          <svg xmlns="http://www.w3.org/2000/svg" width="38" height="46">
            <path d="M 0 0 L 38 0 L 38 46 L 0 46 Z" fill="#FFFFFF"></path>
            <path
              d="M 19.088 38.262 L 8.294 27.988 L 8.294 17.714 L 18.827 17.714 L 8.294 7.688 L 29.882 7.688 L 29.882 17.962 L 19.349 17.962 L 29.882 27.988 L 19.088 27.988 Z"
              fill="#000000"
            ></path>
          </svg>
          <h1>Welcome to Framer</h1>
          <p className="signup__text">
            Don't have an account?&nbsp;
            <a href="/register" className="signup__link">
              Sign up
            </a>
          </p>
        </div>

        {loading ? (
          <Skeleton type="custom_effect" />
        ) : success ? (
          <Box sx={{ width: "100%", mt: 2 }}>
            <Collapse in={open}>
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2, mr: 0 }}
              >
                Authenticated as `{username}`
              </Alert>
            </Collapse>
          </Box>
        ) : (
          error && (
            <Box sx={{ width: "100%", mt: 2 }}>
              <Collapse in={open}>
                <Alert
                  severity="error"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2, mr: 0 }}
                >
                  {error}
                </Alert>
              </Collapse>
            </Box>
          )
        )}

        <form className="login__form" onSubmit={handleLogin}>
          <h4>Username</h4>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
            pattern="^[A-Za-z0-9]{8,20}$"
            onBlur={() => {
              setFocusedUsernameField(true);
            }}
            focusedusername={focusedUsernameField.toString()}
          />
          <span className="login__errorMessage login__errorMessageUsername">
            Username should be 8-20 characters long and should not include any
            special characters
          </span>
          <h4>Password</h4>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,29}$"
            onBlur={() => {
              setFocusedPasswordField(true);
            }}
            focusedpassword={focusedPasswordField.toString()}
          />
          <span className="login__errorMessage login__errorMessagePassword">
            Password must be 8-30 characters long and must contain an uppercase,
            a lowercase, a number and a special character and should not start
            with a special character
          </span>
          <a href="/forgot-password">Forgot Password?</a>
          <button className="login__button" type="submit" disabled={loading}>
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
