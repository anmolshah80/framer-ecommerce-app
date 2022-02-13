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

export const getOrdersByUserIDReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_ORDERSBYUSERID_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "GET_ORDERSBYUSERID_SUCCESS":
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };

    case "GET_ORDERSBYUSERID_FAILED":
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

export const getOrderDescByIDReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_ORDERDESCBYID_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "GET_ORDERDESCBYID_SUCCESS":
      return {
        ...state,
        loading: false,
        order_desc: action.payload,
      };

    case "GET_ORDERDESCBYID_FAILED":
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
