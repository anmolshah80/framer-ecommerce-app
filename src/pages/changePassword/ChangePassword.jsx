import React from "react";
import "./changePassword.css";
import Topbar from "../../components/topbar/Topbar";
import { ArrowForwardIos } from "@mui/icons-material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import Skeleton from "../../components/skeleton/Skeleton";
import { changePassword } from "../../actions/userActions";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [open, setOpen] = useState(true);

  const [focusedOldPasswordField, setFocusedOldPasswordField] = useState(false);
  const [focusedNewPasswordField, setFocusedNewPasswordField] = useState(false);
  const [focusedConfirmPasswordField, setFocusedConfirmPasswordField] =
    useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = JSON.parse(localStorage.getItem("user"));

  const changePasswordState = useSelector(
    (state) => state.changePasswordReducer
  );

  const { changePasswordLoading, changePasswordSuccess, changePasswordError } =
    changePasswordState;

  const handleChangePassword = (e) => {
    e.preventDefault();

    const updatedPassword = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };

    if (newPassword === confirmPassword) {
      dispatch(changePassword(userId, updatedPassword));
      setOpen(true);
    }
  };

  changePasswordSuccess &&
    setTimeout(() => {
      navigate("/login");
      window.location.reload();
    }, 3000);

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

            {changePasswordLoading ? (
              <Skeleton type="custom_effect" />
            ) : changePasswordSuccess ? (
              <Box sx={{ width: "100%", mt: 0 }}>
                <Collapse in={open}>
                  <Alert
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setOpen(false);
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                    sx={{ mb: 2, mr: 0 }}
                  >
                    Password has been changed successfully.
                  </Alert>
                </Collapse>
              </Box>
            ) : (
              changePasswordError && (
                <Box sx={{ width: "100%", mt: 0 }}>
                  <Collapse in={open}>
                    <Alert
                      severity="error"
                      action={
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setOpen(false);
                          }}
                        >
                          <CloseIcon fontSize="inherit" />
                        </IconButton>
                      }
                      sx={{ mb: 2, mr: 0 }}
                    >
                      {changePasswordError}
                    </Alert>
                  </Collapse>
                </Box>
              )
            )}

            <form
              className="change__passwordForm"
              onSubmit={handleChangePassword}
            >
              <label>Old Password</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => {
                  setOldPassword(e.target.value);
                }}
                required
                pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,29}$"
                onBlur={() => {
                  setFocusedOldPasswordField(true);
                }}
                focusedoldpassword={focusedOldPasswordField.toString()}
              />
              <span className="change__passwordErrorMessage change__oldPasswordError">
                Please match the specified password format written above
              </span>
              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                required
                pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,29}$"
                onBlur={() => {
                  setFocusedNewPasswordField(true);
                }}
                focusednewpassword={focusedNewPasswordField.toString()}
              />
              <span className="change__passwordErrorMessage change__newPasswordError">
                Please match the specified password format written above
              </span>
              <label>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                required
                pattern={newPassword}
                onBlur={() => {
                  setFocusedConfirmPasswordField(true);
                }}
                focusedconfirmpassword={focusedConfirmPasswordField.toString()}
              />
              <span className="change__passwordErrorMessage change__confirmPasswordError">
                New password and confirm password should match
              </span>
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
