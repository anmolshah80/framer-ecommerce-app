export const registerNewUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_REGISTER_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "USER_REGISTER_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
      };

    case "USER_REGISTER_FAILED":
      return {
        ...state,
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};

export const loginUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "USER_LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
      };

    case "USER_LOGIN_FAILED":
      return {
        ...state,
        loading: false,
        error: "Incorrect username or password.",
      };

    default:
      return state;
  }
};

export const logoutUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_LOGOUT_SUCCESS":
      return {
        ...state,
      };

    default:
      return state;
  }
};

// export const getAllUsersReducer = (state = { users: [] }, action) => {
//   switch (action.type) {
//     case "GET_ALLUSERS_REQUEST":
//       return {
//         ...state,
//         loading: true,
//       };

//     case "GET_ALLUSERS_SUCCESS":
//       return {
//         ...state,
//         loading: false,
//         users: action.payload,
//       };

//     case "GET_ALLUSERS_FAILED":
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };

//     default:
//       return state;
//   }
// };

export const deleteUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "DELETE_USER_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "DELETE_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
      };

    case "DELETE_USER_FAILED":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const getUserProfileByIdReducer = (
  state = { user_profile: {} },
  action
) => {
  switch (action.type) {
    case "GET_USERPROFILEBYID_REQUEST":
      return {
        loading: true,
      };

    case "GET_USERPROFILEBYID_SUCCESS":
      return {
        user_profile: action.payload,
        loading: false,
      };

    case "GET_USERPROFILEBYID_FAILED":
      return {
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export const getUserByIdReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case "GET_USERBYID_REQUEST":
      return {
        loading: true,
      };

    case "GET_USERBYID_SUCCESS":
      return {
        user: action.payload,
        loading: false,
      };

    case "GET_USERBYID_FAILED":
      return {
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export const updateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_PROFILE_REQUEST":
      return {
        ...state,
        updateProfileLoading: true,
      };

    case "UPDATE_PROFILE_SUCCESS":
      return {
        ...state,
        updateProfileLoading: false,
        updateProfileSuccess: true,
      };

    case "UPDATE_PROFILE_FAILED":
      return {
        ...state,
        updateProfileLoading: false,
        updateProfileError: action.payload,
      };

    default:
      return state;
  }
};

export const changePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case "CHANGE_PASSWORD_REQUEST":
      return {
        ...state,
        changePasswordLoading: true,
      };

    case "CHANGE_PASSWORD_SUCCESS":
      return {
        ...state,
        changePasswordLoading: false,
        changePasswordSuccess: true,
      };

    case "CHANGE_PASSWORD_FAILED":
      return {
        ...state,
        changePasswordLoading: false,
        changePasswordError: "Incorrect old password.",
      };

    default:
      return state;
  }
};

export const deleteUserAccountReducer = (state = {}, action) => {
  switch (action.type) {
    case "DELETE_USER_REQUEST":
      return {
        ...state,
        deleteAccountLoading: true,
      };

    case "DELETE_USER_SUCCESS":
      return {
        ...state,
        deleteAccountLoading: false,
        deleteAccountSuccess: true,
      };

    case "DELETERUSER_FAILED":
      return {
        ...state,
        deleteAccountLoading: false,
        deleteAccountError: action.payload,
      };

    default:
      return state;
  }
};
