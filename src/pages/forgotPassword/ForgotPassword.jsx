import React from "react";
import "./forgotPassword.css";

export default function ForgotPassword() {
  return (
    <div className="forgotPassword">
      <div className="forgotPasswordContainer">
        <div className="framerLogo">
          <svg xmlns="http://www.w3.org/2000/svg" width="38" height="46">
            <path d="M 0 0 L 38 0 L 38 46 L 0 46 Z" fill="#FFFFFF"></path>
            <path
              d="M 19.088 38.262 L 8.294 27.988 L 8.294 17.714 L 18.827 17.714 L 8.294 7.688 L 29.882 7.688 L 29.882 17.962 L 19.349 17.962 L 29.882 27.988 L 19.088 27.988 Z"
              fill="#000000"
            ></path>
          </svg>
        </div>
        <h1 className="passwordResetText">Password Reset</h1>
        <form className="passwordResetForm">
          <h4>Email Address</h4>
          <input type="email" required />
          <button type="submit" className="resetButton">
            Reset Password
          </button>
        </form>
        <a href="/login">Sign in</a>
      </div>
    </div>
  );
}
