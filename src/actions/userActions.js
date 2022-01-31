import axios from "axios";

export const registerUser = () => (dispatch) => {
  dispatch({ type: "USER_REGISTER_REQUEST" });

  axios
    .post("auth/register")
    .then((res) => {
      dispatch({ type: "USER_REGISTER_SUCCESS" });
    })
    .catch((err) => dispatch({ type: "USER_REGISTER_FAILED" }));
};

// logout user
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("user");
  localStorage.removeItem("cartItems");

  dispatch({ type: "USER_LOGOUT" });
};
