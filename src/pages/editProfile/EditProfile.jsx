import React from "react";
import "./editProfile.css";
import Topbar from "../../components/topbar/Topbar";
import { ArrowForwardIos, Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { updateProfile, getUserProfileById } from "../../actions/userActions";
import { Link, useParams, useNavigate } from "react-router-dom";
import Skeleton from "../../components/skeleton/Skeleton";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";

export default function EditProfile() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  // const [profileAvatar, setProfileAvatar] = useState("");

  const [open, setOpen] = useState(true);

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userProfileState = useSelector(
    (state) => state.getUserProfileByIdReducer
  );

  const { user_profile, loading, error } = userProfileState;

  const updatedProfileState = useSelector(
    (state) => state.updateProfileReducer
  );

  const { updateProfileLoading, updateProfileSuccess, updateProfileError } =
    updatedProfileState;

  useEffect(() => {
    if (user_profile) {
      if (user_profile._id === params.userId) {
        setFullName(user_profile.profileDetails.fullName);
        setPhone(user_profile.profileDetails.phone);
        setAddress(user_profile.profileDetails.address);
        setCity(user_profile.profileDetails.city);
        setCountry(user_profile.profileDetails.country);
        // setProfileAvatar(user_profile.profileDetails.profileAvatar);
      } else {
        dispatch(getUserProfileById(params.userId));
      }
    } else {
      dispatch(getUserProfileById(params.userId));
    }
  }, [dispatch, user_profile]);

  const updateUserProfile = (e) => {
    e.preventDefault();

    const updatedProfile = {
      fullName: fullName,
      phone: phone,
      address: address,
      city: city,
      country: country,
    };

    dispatch(updateProfile(params.userId, updatedProfile));

    setTimeout(() => {
      navigate("/user-profile");
      window.location.reload();
    }, 5000);
  };

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
          <span>Update Profile</span>
        </div>
        <div className="edit__profile">
          <h2>Edit Profile</h2>
          <div className="edit__profileFormContainer">
            {updateProfileLoading ? (
              <Skeleton type="custom_effect" />
            ) : updateProfileSuccess ? (
              <Box sx={{ width: "100%" }}>
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
                    sx={{ mb: 2, mr: 3 }}
                  >
                    Your profile was updated successfully.
                  </Alert>
                </Collapse>
              </Box>
            ) : (
              updateProfileError && (
                <Box sx={{ width: "100%" }}>
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
                      sx={{ mb: 2, mr: 3 }}
                    >
                      There was an error while updating your profile.
                    </Alert>
                  </Collapse>
                </Box>
              )
            )}

            {loading ? (
              <Skeleton type="circular_effect" />
            ) : error ? (
              <Skeleton
                type="custom_effect"
                message="Something went wrong while fetching your profile details."
              />
            ) : (
              user_profile && (
                <form
                  className="edit__profileForm"
                  onSubmit={updateUserProfile}
                >
                  <label htmlFor="full_name" className="form__label">
                    Full Name
                  </label>
                  <input
                    className="form__input"
                    type="text"
                    name="full_name"
                    id="full_name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                  <label htmlFor="phone" className="form__label">
                    Phone
                  </label>
                  <input
                    className="form__input"
                    type="tel"
                    name="phone"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <label htmlFor="address" className="form__label">
                    Address
                  </label>
                  <input
                    className="form__input"
                    type="text"
                    name="address"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <label htmlFor="city" className="form__label">
                    City
                  </label>
                  <input
                    className="form__input"
                    type="text"
                    name="city"
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <label htmlFor="country" className="form__label">
                    Country
                  </label>
                  <input
                    className="form__input"
                    type="text"
                    name="country"
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                  {/* <label htmlFor="upload_avatar" className="form__label">
                  Upload a photo...
                </label>
                <input
                  className="form__input input__typeFile"
                  type="file"
                  name="upload_avatar"
                  id="upload_avatar"
                  value={profileAvatar}
                  onChange={(e) => {
                    setProfileAvatar(e.target.value);
                  }}
                /> */}
                  <button
                    className="edit__profileButton"
                    type="submit"
                    disabled={
                      updateProfileSuccess &&
                      setTimeout(() => {
                        console.log("update button is disabled");
                      }, 5000)
                    }
                  >
                    Update
                  </button>
                </form>
              )
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
