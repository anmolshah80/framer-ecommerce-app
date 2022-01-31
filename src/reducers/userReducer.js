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
  }
};

export const logoutReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_LOGOUT":
      return {
        ...state,
      };

    default:
      return state;
  }
};
