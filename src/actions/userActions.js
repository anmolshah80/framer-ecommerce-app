import axios from "axios";

// user action to register a new account
export const registerNewUser = (user) => (dispatch) => {
  dispatch({ type: "USER_REGISTER_REQUEST" });

  axios
    .post("/auth/register", user)
    .then((res) => {
      console.log("res from user register action: ", res);

      if (res.data.errorMessage) {
        sessionStorage.setItem("errorMessage", res.data.errorMessage);
        dispatch({ type: "USER_REGISTER_FAILED" });
      } else {
        dispatch({ type: "USER_REGISTER_SUCCESS" });
      }
    })
    .catch((err) => dispatch({ type: "USER_REGISTER_FAILED" }));
};

// user action to login into the account
export const loginUser = (user) => (dispatch) => {
  dispatch({ type: "USER_LOGIN_REQUEST" });

  axios
    .post("/auth/login", user)
    .then((res) => {
      console.log("res.data from login action: ", res.data);
      dispatch({ type: "USER_LOGIN_SUCCESS" });
      localStorage.setItem("user", JSON.stringify(res.data));
    })
    .catch((err) => dispatch({ type: "USER_LOGIN_FAILED", payload: err }));
};

// user action to logout from the account
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("user");
  localStorage.removeItem("cartItems");

  dispatch({ type: "USER_LOGOUT_SUCCESS" });
};

// user action to fetch all the users from database
// this request can only be executed by an admin
// export const getAllUsers = () => (dispatch) => {
//   dispatch({ type: "GET_ALLUSERS_REQUEST" });

//   axios
//     .get("/all-users")
//     .then((res) => {
//       dispatch({ type: "GET_ALLUSERS_SUCCESS", payload: res.data });
//     })
//     .catch((err) => {
//       dispatch({ type: "GET_ALLUSERS_FAILED", payload: err });
//     });
// };

// Needs severe changes below >>>>>>>>>>>>>>>

// user action to delete a user and the orders details associated
// with that user from database
export const deleteUser = (user_id) => (dispatch) => {
  dispatch({ type: "DELETE_USER_REQUEST" });

  axios
    .post("/delete-user", { user_id })
    .then((res) => {
      dispatch({ type: "DELETE_USER_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: "DELETE_USER_FAILED", payload: err });
    });
};

// fetch a user profile (i.e., get a user's details without the user password) based on userID
export const getUserProfileById = (userId) => (dispatch) => {
  dispatch({
    type: "GET_USERPROFILEBYID_REQUEST",
  });

  axios
    .post("/user/profilebyid", { userId })
    .then((res) => {
      console.log(res);
      dispatch({ type: "GET_USERPROFILEBYID_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: "GET_USERPROFILEBYID_FAILED", payload: err });
    });
};

// fetch a user profile and the password of that user based on userID
export const getUserById = (userId) => (dispatch) => {
  dispatch({
    type: "GET_USERBYID_REQUEST",
  });

  axios
    .post("/user/userbyid", { userId })
    .then((res) => {
      console.log(res);
      dispatch({ type: "GET_USERBYID_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: "GET_USERBYID_FAILED", payload: err });
    });
};

// user action to update their own profile
export const updateProfile = (userId, updatedProfile) => (dispatch) => {
  dispatch({ type: "UPDATE_PROFILE_REQUEST" });

  axios
    .post("/user/edit-profile", { userId, updatedProfile })
    .then((res) => {
      dispatch({ type: "UPDATE_PROFILE_SUCCESS" });
    })
    .catch((err) => {
      dispatch({ type: "UPDATE_PROFILE_FAILED" });
    });
};

// user action to change account password
export const changePassword = (userId, updatedPassword) => (dispatch) => {
  dispatch({ type: "Change_PASSWORD_REQUEST" });

  axios
    .post("/auth/change-password", { userId, updatedPassword })
    .then((res) => {
      dispatch({ type: "CHANGE_PASSWORD_SUCCESS" });
      localStorage.removeItem("user");
    })
    .catch((err) => {
      dispatch({ type: "CHANGE_PASSWORD_FAILED", payload: err });
    });
};
