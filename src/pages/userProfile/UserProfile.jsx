import React from "react";
import "./userProfile.css";
import { ArrowForwardIos } from "@mui/icons-material";
import Topbar from "../../components/topbar/Topbar";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileById } from "../../actions/userActions";
import Skeleton from "../../components/skeleton/Skeleton";

export default function UserProfile() {
  const currentUserState = useSelector((state) => state.loginUserReducer);
  const { currentUser } = currentUserState;

  const dispatch = useDispatch();

  const userProfileState = useSelector(
    (state) => state.getUserProfileByIdReducer
  );

  const { user_profile, loading, error } = userProfileState;

  useEffect(() => {
    dispatch(getUserProfileById(currentUser._id));
  }, []);

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
          <Link to={`/edit-profile/${currentUser._id}`}>
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

        {loading ? (
          <Skeleton type="circular_effect" />
        ) : error ? (
          <Skeleton
            type="custom_effect"
            message="Something went wrong while fetching your profile details."
          />
        ) : (
          user_profile?.profileDetails && (
            <div className="profile">
              <img
                src={user_profile.profileAvatar}
                alt={`${user_profile.username} profile avatar`}
                className="user__avatar"
              />

              <div className="user__info">
                <div className="user__shortInfo">
                  <h3>{user_profile.username}</h3>
                  <span>{user_profile.email}</span>
                </div>
                <span>Personal Details</span>
                <div className="user__information">
                  <div className="full__name">
                    <p className="header__wordWrap">Full Name </p>
                    <p className="header__valueWrap">
                      {user_profile.profileDetails.fullName === ""
                        ? "N/A"
                        : user_profile.profileDetails.fullName}
                    </p>
                  </div>
                  <div className="phone__number">
                    <p className="header__wordWrap">Phone</p>
                    <p className="header__valueWrap">
                      {user_profile.profileDetails.phone === 0
                        ? "N/A"
                        : user_profile.profileDetails.phone}
                    </p>
                  </div>
                  <div className="address">
                    <p className="header__wordWrap">Address</p>
                    <p className="header__valueWrap">
                      {user_profile.profileDetails.address === ""
                        ? "N/A"
                        : user_profile.profileDetails.address}
                    </p>
                  </div>
                  <div className="city">
                    <p className="header__wordWrap">City</p>
                    <p className="header__valueWrap">
                      {user_profile.profileDetails.city === ""
                        ? "N/A"
                        : user_profile.profileDetails.city}
                    </p>
                  </div>
                  <div className="country">
                    <p className="header__wordWrap">Country</p>
                    <p className="header__valueWrap">
                      {user_profile.profileDetails.country === ""
                        ? "N/A"
                        : user_profile.profileDetails.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </React.Fragment>
  );
}
