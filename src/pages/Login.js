import React from "react";
import "./Login.css";

function Login() {
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

        <form className="login__form">
          <h4>Username</h4>
          <input type="text" />
          <h4>Password</h4>
          <input type="password" />
          <a href="#">Forgot Password?</a>
          <button className="login__button">Sign in</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
