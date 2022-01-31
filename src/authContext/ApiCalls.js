import axios from "axios";
import { loginFailure, loginStart, loginSuccess, logout } from "./AuthActions";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const logoutUser = async (user, dispatch) => {
  dispatch(logout());
  try {
    const res = await axios.post("auth/logout", user);
    dispatch(logout(res.data));
  } catch (err) {
    dispatch(console.log("User not logged out!"));
  }
};
