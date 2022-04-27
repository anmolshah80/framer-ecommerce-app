import React from "react";
import "./deleteAccount.css";
import Topbar from "../../components/topbar/Topbar";
import { Link, useNavigate } from "react-router-dom";
import { ArrowForwardIos, WarningAmber, Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "../../components/skeleton/Skeleton";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import { useState, useEffect } from "react";
import { deleteUserAccount } from "../../actions/userActions";

export default function DeleteAccount() {
  const [open, setOpen] = useState(true);

  const [email, setEmail] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const currentUserState = useSelector((state) => state.loginUserReducer);

  const { currentUser } = currentUserState;

  const [focusedConfirmationField, setFocusedConfirmationField] =
    useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setEmail(currentUser.email);

    return () => {
      setEmail("");
    };
  }, []);

  const deleteAccountState = useSelector(
    (state) => state.deleteUserAccountReducer
  );

  const { deleteAccountLoading, deleteAccountSuccess, deleteAccountError } =
    deleteAccountState;

  const handleAccountDeletion = (e) => {
    e.preventDefault();

    dispatch(deleteUserAccount(currentUser._id));
    setOpen(true);
  };

  deleteAccountSuccess &&
    setTimeout(() => {
      navigate("/register");
      localStorage.removeItem("user");
      window.location.reload();
    }, 3000);

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
                  If you simply need to change your account password or update
                  your profile details, you don't need to close your account.
                  For more information on updating your account, go to
                  <a href="/user-profile" className="change__accountSettings">
                    Change your Account Settings.
                  </a>
                </p>
              </div>

              {deleteAccountLoading ? (
                <Skeleton type="custom_effect" />
              ) : deleteAccountSuccess ? (
                <Box sx={{ width: "100%", mt: 2 }}>
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
                          <Close fontSize="inherit" />
                        </IconButton>
                      }
                      sx={{ mb: 0, mr: 0, ml: 0 }}
                    >
                      Your account was deleted successfully.
                    </Alert>
                  </Collapse>
                </Box>
              ) : (
                deleteAccountError && (
                  <Box sx={{ width: "100%", mt: 2 }}>
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
                            <Close fontSize="inherit" />
                          </IconButton>
                        }
                        sx={{ mb: 0, mr: 0, ml: 0 }}
                      >
                        There was an error while deleting your account.
                      </Alert>
                    </Collapse>
                  </Box>
                )
              )}

              <form
                className="account__deletionForm"
                onSubmit={handleAccountDeletion}
              >
                <label className="account__username">Your email address:</label>
                <input
                  type="email"
                  className="email__addressInput"
                  required
                  value={email}
                  readOnly
                />
                <label className="confirmation__label">
                  To verify, type
                  <i className="italisize">delete my account</i>
                  below:
                </label>
                <input
                  type="text"
                  value={confirmation}
                  onChange={(e) => {
                    setConfirmation(e.target.value);
                  }}
                  className="confirm__deletion"
                  pattern="delete my account"
                  onBlur={() => {
                    setFocusedConfirmationField(true);
                  }}
                  focusedconfirmation={focusedConfirmationField.toString()}
                  required
                ></input>
                <span className="delete__accountErrorMessage delete__accountErrorConfirmation">
                  Input verification text is invalid
                </span>
                <button className="delete__accountButton" type="submit">
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
