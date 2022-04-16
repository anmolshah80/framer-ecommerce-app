import React from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";
import avatar from "../../avatar";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import Skeleton from "../../components/skeleton/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useLayoutEffect } from "react";
import { registerNewUser } from "../../actions/userActions";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [open, setOpen] = useState(true);

  const [errorMessage, setErrorMessage] = useState("null");

  const [focusedUsernameField, setFocusedUsernameField] = useState(false);
  const [focusedEmailField, setFocusedEmailField] = useState(false);
  const [focusedPasswordField, setFocusedPasswordField] = useState(false);
  const [focusedConfirmPasswordField, setFocusedConfirmPasswordField] =
    useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const userRegistrationState = useSelector(
    (state) => state.registerNewUserReducer
  );

  const { loading, success, error } = userRegistrationState;

  useLayoutEffect(() => {
    errorMessage === "null" && sessionStorage.setItem("errorMessage", null);
  }, []);

  const handleRegistration = (e) => {
    e.preventDefault();

    const user = {
      username: username,
      email: email,
      password: password,
      avatar: avatar,
    };

    if (password === confirmPassword) {
      dispatch(registerNewUser(user));
      setErrorMessage(sessionStorage.getItem("errorMessage"));
      setOpen(true);
    }
  };

  success &&
    setTimeout(() => {
      sessionStorage.setItem("errorMessage", "null");
      navigate("/login");
    }, 4000);

  useEffect(() => {
    setErrorMessage(sessionStorage.getItem("errorMessage"));
  });

  return (
    <div className="register">
      <div className="register__container">
        <div className="container__text">
          <svg xmlns="http://www.w3.org/2000/svg" width="38" height="46">
            <path d="M 0 0 L 38 0 L 38 46 L 0 46 Z" fill="#FFFFFF"></path>
            <path
              d="M 19.088 38.262 L 8.294 27.988 L 8.294 17.714 L 18.827 17.714 L 8.294 7.688 L 29.882 7.688 L 29.882 17.962 L 19.349 17.962 L 29.882 27.988 L 19.088 27.988 Z"
              fill="#000000"
            ></path>
          </svg>
          <h1>Create Account</h1>
          <p className="login__text">
            Already have an account?&nbsp;
            <a href="/login" className="login__link">
              Sign in
            </a>
          </p>
        </div>

        {loading ? (
          <Skeleton type="custom_effect" />
        ) : success ? (
          <Box sx={{ width: "100%" }} className="register__alertBox">
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
                Your account has been created successfully.
              </Alert>
            </Collapse>
          </Box>
        ) : (
          (error || errorMessage !== "null") && (
            <Box sx={{ width: "100%" }} className="register__alertBox">
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
                  {errorMessage
                    ? errorMessage
                    : error &&
                      "There was an error while creating your account."}
                </Alert>
              </Collapse>
            </Box>
          )
        )}

        <form className="register__form" onSubmit={handleRegistration}>
          <h4>Username</h4>
          <input
            type="text"
            required
            pattern="^[A-Za-z0-9]{8,20}$"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            onBlur={() => {
              setFocusedUsernameField(true);
            }}
            focusedusername={focusedUsernameField.toString()}
          />
          <span className="signup__errorMessage signup__errorMessageUsername">
            Username should be 8-20 characters long and should not include any
            special characters
          </span>

          <h4>Email</h4>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            onBlur={() => {
              setFocusedEmailField(true);
            }}
            focusedemail={focusedEmailField.toString()}
          />
          <span className="signup__errorMessage signup__errorMessageEmail">
            Input email address is invalid
          </span>

          <h4>Password</h4>
          <input
            type="password"
            required
            pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,29}$"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onBlur={() => {
              setFocusedPasswordField(true);
            }}
            focusedpassword={focusedPasswordField.toString()}
          />
          <span className="signup__errorMessage signup__errorMessagePassword">
            Password must be 8-30 characters long and must contain an uppercase,
            a lowercase, a number and a special character and should not start
            with a special character
          </span>

          <span>Password must:</span>
          <ul>
            <li>Be atleast 8 characters long</li>
            <li>Contain atleast one uppercase character [A-Z]</li>
            <li>Contain atleast one lowercase character [a-z]</li>
            <li>Contain atleast one numeric character [0-9]</li>
            <li>Contain atleast one special character [@, #, $, %]</li>
          </ul>
          <h4>Confirm Password</h4>
          <input
            type="password"
            required
            pattern={password}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            onBlur={() => {
              setFocusedConfirmPasswordField(true);
            }}
            focusedconfirmpassword={focusedConfirmPasswordField.toString()}
          />
          <span className="signup__errorMessage signup__errorMessageConfirmPassword">
            Password and confirm password should match
          </span>

          <button className="register__button" type="submit">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
