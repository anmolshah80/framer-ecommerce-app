export const placeOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case "PLACE_ORDER_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "PLACE_ORDER_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
      };

    case "PLACE_ORDER_FAILED":
      return {
        ...state,
        loading: false,
        error: true,
      };

    default:
      return {
        state,
      };
  }
};
