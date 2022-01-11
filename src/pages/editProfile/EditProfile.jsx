import React from "react";
import "./editProfile.css";
import Topbar from "../../components/topbar/Topbar";
import { Link } from "react-router-dom";
import { ArrowForwardIos } from "@mui/icons-material";

export default function EditProfile() {
  return (
    <React.Fragment>
      <Topbar />
      <div className="edit__profile">
        <div className="breadcrumb__linking">
          <Link to="/">
            <span className="dashboard__link">Home</span>
          </Link>
          <ArrowForwardIos className="arrow__forwardIcon" />
          <Link to="/user-profile">
            <span className="user__profileLink">Profile</span>
          </Link>
          <ArrowForwardIos className="arrow__forwardIcon" />
          <span>Edit Profile</span>
        </div>
        <div className="edit__profile">
          <h2>Edit Profile</h2>
          <form className="edit__profileForm">
            <label for="full_name" className="form__label">
              Full Name
            </label>
            <input
              className="form__input"
              type="text"
              name="full_name"
              id="full_name"
            />
            <label for="phone" className="form__label">
              Phone
            </label>
            <input className="form__input" type="tel" name="phone" id="phone" />
            <label for="address" className="form__label">
              Address
            </label>
            <input
              className="form__input"
              type="text"
              name="address"
              id="address"
            />
            <label for="city" className="form__label">
              City
            </label>
            <input className="form__input" type="text" name="city" id="city" />
            <label for="country" className="form__label">
              Country
            </label>
            <input
              className="form__input"
              type="text"
              name="country"
              id="country"
            />
            <label for="upload_avatar" className="form__label">
              Upload a photo...
            </label>
            <input
              className="form__input input__typeFile"
              type="file"
              name="upload_avatar"
              id="upload_avatar"
            />
            <button className="edit__profileButton">Update</button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}
