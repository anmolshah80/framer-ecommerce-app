export const userProfileUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_PROFILEUPDATE_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "USER_PROFILEUPDATE_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
      };

    case "USER_PROFILEUPDATE_FAILED":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const getUserProfileByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_USERPROFILEBYID_REQUEST":
      return {
        loading: true,
      };

    case "GET_USERPROFILEBYID_SUCCESS":
      return {
        userProfile: action.payload,
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
