import React from "react";
import "./userProfile.css";
import { ArrowForwardIos } from "@mui/icons-material";
import Topbar from "../../components/topbar/Topbar";
import avatar from "../../avatar";
import { NavLink, Link } from "react-router-dom";

export default function UserProfile() {
  return (
    <React.Fragment>
      <Topbar />
      <div className="user__profile">
        <div className="breadcrumb__link">
          <Link to="/">
            <span className="dashboard__link">Home</span>
          </Link>
          <ArrowForwardIos className="arrow__forwardIcon" />
          <span>Profile</span>
        </div>
        <div className="profile__actionButtons">
          <Link to="/edit-profile">
            <button className="action__buttons">Edit Profile</button>
          </Link>
          <Link to="/delete-account">
            <button className="action__buttons">Delete</button>
          </Link>
          <Link to="/change-password">
            <button className="action__buttons">Change Password</button>
          </Link>
        </div>
        <h2>User Profile</h2>
        <div className="profile">
          <img
            src={avatar}
            alt="user profile avatar"
            className="user__avatar"
          />

          <div className="user__info">
            <div className="user__shortInfo">
              <h3>Suhana</h3>
              <span>suhana_pokhrel@gmail.com</span>
            </div>
            <span>Personal Details</span>
            <div className="user__information">
              <div className="full__name">
                <p className="header__wordWrap">Full Name </p>
                <p className="header__valueWrap">Suhana Pokhrel</p>
              </div>
              <div className="phone__number">
                <p className="header__wordWrap">Phone</p>
                <p className="header__valueWrap">9818367219</p>
              </div>
              <div className="address">
                <p className="header__wordWrap">Address</p>
                <p className="header__valueWrap">Naxal, Kathmandu</p>
              </div>
              <div className="city">
                <p className="header__wordWrap">City</p>
                <p className="header__valueWrap">Kathmandu</p>
              </div>
              <div className="country">
                <p className="header__wordWrap">Country</p>
                <p className="header__valueWrap">Nepal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
