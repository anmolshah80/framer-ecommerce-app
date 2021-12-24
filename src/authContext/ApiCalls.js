import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

// export const logout = async (user, dispatch) => {
//   dispatch(logoutStart());
//   try {
//     const res = await axios.post("auth/logout", user);
//     dispatch(logoutStart(res.data));
//   } catch (err) {
//     dispatch(console.log("User not logged out!"));
//   }
// };
