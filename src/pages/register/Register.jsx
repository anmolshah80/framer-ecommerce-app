import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [focused, setFocused] = useState(false);

  const { errorMessage } = props;

  const navigate = useNavigate();

  // const password_regex = new RegExp(
  //   /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,29}$/
  // );

  // const regex_exp = new RegExp(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-+_!@#$%^&*()?]){7,29}$/
  // );

  const handleFocus = (e) => {
    setFocused(true);
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (password == confirmPassword) {
      try {
        await axios.post("auth/register", {
          username,
          email,
          password,
          confirmPassword,
        });
        navigate("/login");
        console.log("user registered!");
      } catch (err) {
        console.log("user not registered!");
        console.log(err);
      }
    } else {
      alert("Passwords do not match.");
    }
  };

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

        <form className="register__form" onSubmit={handleRegistration}>
          <h4>Username</h4>
          <input
            required
            type="text"
            pattern="^[A-Za-z0-9]{8,20}$"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            onBlur={handleFocus}
            focused={focused.toString()}
          />
          <span className="signup__errorMessage">
            {errorMessage
              ? errorMessage
              : "Username should be 8-20 characters long and should not include any special characters"}
          </span>

          <h4>Email</h4>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            onBlur={handleFocus}
            focused={focused.toString()}
          />
          <span className="signup__errorMessage">
            {errorMessage ? errorMessage : "Input email address is invalid"}
          </span>

          <h4>Password</h4>
          <input
            required
            type="password"
            pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,29}$"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onBlur={handleFocus}
            focused={focused.toString()}
          />
          <span className="signup__errorMessage">
            {errorMessage
              ? errorMessage
              : "Password must be 8-30 characters long and must contain an uppercase, a lowercase, a number and a special character and should not start with a special character"}
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
            required
            type="password"
            pattern={password}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            onBlur={handleFocus}
            focused={focused.toString()}
          />
          <span className="signup__errorMessage">
            {errorMessage
              ? errorMessage
              : "Password and confirm password should match"}
          </span>
          <button type="submit" className="register__button">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}
