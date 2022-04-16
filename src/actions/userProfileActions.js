import axios from "axios";

// update user profile
export const updateUserProfile = (updatedProfile) => (dispatch) => {
  dispatch({ type: "USER_PROFILEUPDATE_REQUEST" });

  axios
    .post("/profile/edit-profile", { updatedProfile })
    .then((res) => {
      dispatch({ type: "USER_PROFILEUPDATE_SUCCESS" });
    })
    .catch((err) => {
      dispatch((err) => dispatch({ type: "USER_PROFILEUPDATE_FAILED" }));
    });
};

// fetch the user profile info based on user_id
export const getUserProfileById = (userId) => (dispatch) => {
  dispatch({
    type: "GET_USERPROFILEBYID_REQUEST",
  });

  axios
    .post("/profile/profilebyid", { userId })
    .then((res) => {
      console.log(res);
      dispatch({ type: "GET_USERPROFILEBYID_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: "GET_USERPROFILEBYID_FAILED", payload: err });
    });
};
