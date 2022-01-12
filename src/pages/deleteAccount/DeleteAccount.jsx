import React from "react";
import "./deleteAccount.css";
import Topbar from "../../components/topbar/Topbar";
import { Link } from "react-router-dom";
import { ArrowForwardIos, WarningAmber } from "@mui/icons-material";

export default function DeleteAccount() {
  return (
    <React.Fragment>
      <Topbar />
      <div className="delete__account">
        <div className="delete__accountBreadcrumbLinks">
          <Link to="/">
            <span className="dashboard__link">Home</span>
          </Link>
          <ArrowForwardIos className="arrow__forwardIcon" />
          <Link to="/user-profile">
            <span className="user__profileLink">Profile</span>
          </Link>
          <ArrowForwardIos className="arrow__forwardIcon" />
          <span>Delete Account</span>
        </div>

        <div className="delete__accountContainerWrapper">
          <div className="delete__accountContainer">
            <h3>Are you sure you want to do this?</h3>
            <div className="delete__accountWarning">
              <WarningAmber className="warning__icon" />
              <span className="warning__text">
                This is extremely important.
              </span>
            </div>

            <div className="deletion__detailsWrapper">
              <div className="deletion__details">
                <p className="deletion__detailsText">
                  We will immediately delete all of your account history
                  (including credit card information, order history, etc.)
                </p>
                <p className="deletion__detailsText">
                  Returns and refunds can't be processed for orders on closed
                  accounts, and your username will be available to anyone on
                  Framer.
                </p>
                <p className="deletion__detailsText">
                  If you simply need to change your e-mail address or remove a
                  payment method from your account, you don't need to close your
                  account. For more information on updating your account, go to
                  <a
                    href="/account-settings"
                    className="change__accountSettings"
                  >
                    Change your Account Settings.
                  </a>
                </p>
              </div>

              <form className="account__deletionForm">
                <label className="account__username">Your email address:</label>
                <input type="email" className="email__addressInput" required />
                <label className="confirmation__label">
                  To verify, type
                  <i className="italisize">delete my account</i>
                  below:
                </label>
                <input
                  type="text"
                  className="confirm__deletion"
                  required
                ></input>
                <button className="delete__accountButton">
                  Delete this account
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
