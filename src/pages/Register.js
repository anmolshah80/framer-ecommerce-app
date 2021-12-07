import React from "react";
import Header from "../components/Header";
import "./Register.css";

function Register() {
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

        <form className="register__form">
          <h4>Username</h4>
          <input type="text" />
          <h4>Email</h4>
          <input type="email" />
          <h4>Password</h4>
          <input type="password" />
          <span>Password must:</span>
          <ul>
            <li>Be atleast 8 characters long</li>
            <li>Contain atleast one uppercase character [A-Z]</li>
            <li>Contain atleast one lowercase character [a-z]</li>
            <li>Contain atleast one numeric character [0-9]</li>
            <li>Contain atleast one special character [@, #, $, %]</li>
          </ul>
          <h4>Confirm Password</h4>
          <input type="password" />
          <button className="register__button">Sign up</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
