import React, { useRef, useState } from "react";
// import Header from "../../components/Header";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const usernameErrorMessage =
    "Username should be between 3 and 25 characters.";
  const passwordErrorMessage =
    "Password should be at least 8 characters long and include at least 1 uppercase character, 1 lowercase character, 1 numeric character, and 1 special character in [@, #, $, %]";

  const handleRegistration = async (e) => {
    e.preventDefault();
    setUsername(usernameRef.current.value);
    setEmail(emailRef.current.value);
    setPassword(passwordRef.current.value);

    // testing purposes only
    // console.log("set credentials: ");
    // console.log(usernameRef.current.value);
    // console.log(email);
    // console.log(password);

    try {
      await axios.post("auth/register", { username, email, password });
      navigate("/login");
      console.log("user registered!");
    } catch (err) {
      console.log("user not registered!");
      console.log(err);
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

        <form className="register__form">
          <h4>Username</h4>
          <input required type="text" ref={usernameRef} />
          {/* <span>{usernameErrorMessage}</span> */}
          <h4>Email</h4>
          <input required type="email" ref={emailRef} />
          <h4>Password</h4>
          <input required type="password" ref={passwordRef} />
          <span>Password must:</span>
          <ul>
            <li>Be atleast 8 characters long</li>
            <li>Contain atleast one uppercase character [A-Z]</li>
            <li>Contain atleast one lowercase character [a-z]</li>
            <li>Contain atleast one numeric character [0-9]</li>
            <li>Contain atleast one special character [@, #, $, %]</li>
          </ul>
          <h4>Confirm Password</h4>
          <input required type="password" />
          <button
            // type="submit"
            className="register__button"
            onClick={handleRegistration}
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}
