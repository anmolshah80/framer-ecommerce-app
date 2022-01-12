import React from "react";
import "./changePassword.css";
import Topbar from "../../components/topbar/Topbar";
import { Link } from "react-router-dom";
import { ArrowForwardIos } from "@mui/icons-material";

export default function ChangePassword() {
  return (
    <React.Fragment>
      <Topbar />
      <div className="change__password">
        <div className="change__passwordBreadcrumbLinks">
          <Link to="/">
            <span className="dashboard__link">Home</span>
          </Link>
          <ArrowForwardIos className="arrow__forwardIcon" />
          <Link to="/user-profile">
            <span className="user__profileLink">Profile</span>
          </Link>
          <ArrowForwardIos className="arrow__forwardIcon" />
          <span>Change Password</span>
        </div>
        <div className="change__passwordContainerWrapper">
          <div className="change__passwordContainer">
            <p className="password__requirementsText">
              Password must contain one lowercase letter, one uppercase letter,
              one number, one special character, and be atleast 7 characters
              long.
            </p>
            <form className="change__passwordForm">
              <label>Password</label>
              <input type="password" required />
              <label>Confirm Password</label>
              <input type="password" required />
              <button type="submit" className="change__passwordButton">
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
