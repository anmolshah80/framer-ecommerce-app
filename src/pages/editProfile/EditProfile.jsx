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
  const [profileAvatar, setProfileAvatar] = useState("");

  const [open, setOpen] = useState(true);

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [previewSource, setPreviewSource] = useState("");

  let uploadedImageURL;

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

  // to preview the profile image to be uploaded
  const previewFile = (file) => {
    const reader = new FileReader();
    // convert the image to a base64EncodedImage url
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

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
        setProfileAvatar(user_profile.profileAvatar);
      } else {
        dispatch(getUserProfileById(params.userId));
      }
    } else {
      dispatch(getUserProfileById(params.userId));
    }
  }, [dispatch, user_profile]);

  // upload the new selected profile image in the cloudinary database
  const uploadImage = async (base64EncodedImage) => {
    // console.log("base64EncodedImage: ", base64EncodedImage);

    try {
      await fetch("/upload", {
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { "Content-type": "application/json" },
      })
        .then((res) => {
          if (res.ok) return res.json();
          return res.json().then((e) => Promise.reject(e));
        })
        .then(({ imageURL, message }) => {
          uploadedImageURL = imageURL;
        })
        .catch((e) => {
          console.error(e.error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const updateUserProfile = async (e) => {
    e.preventDefault();

    if (selectedFile) {
      await new Promise((resolve) => {
        resolve(uploadImage(previewSource));
      });
    }

    const updatedProfile = {
      fullName: fullName,
      phone: phone,
      address: address,
      city: city,
      country: country,
      profileAvatar: uploadedImageURL,
    };

    dispatch(updateProfile(params.userId, updatedProfile));
  };

  updateProfileSuccess &&
    setTimeout(() => {
      navigate("/user-profile");
      window.location.reload();
    }, 3000);

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
                <div className="form__imagePreviewPane">
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
                    <label className="form__label">Upload a photo...</label>
                    <input
                      className="form__input"
                      id="files"
                      type="file"
                      name="image"
                      onChange={handleFileInputChange}
                      value={fileInputState}
                    />
                    <button
                      className="edit__profileButton"
                      type="submit"
                      disabled={
                        updateProfileSuccess &&
                        setTimeout(() => {
                          console.log("update button is disabled");
                        }, 3000)
                      }
                    >
                      Update
                    </button>
                  </form>
                  {(previewSource || profileAvatar) && (
                    <div className="preview__imageContainer">
                      <h3 className="preview__imageText">Preview Image:</h3>
                      <img
                        className="preview__image"
                        src={previewSource ? previewSource : profileAvatar}
                        alt="upload profile avatar"
                        style={{ height: "200px", width: "270px" }}
                      />
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
