export const getAllProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case "GET_PRODUCTS_REQUEST":
      return {
        loading: true,
      };

    case "GET_PRODUCTS_SUCCESS":
      return {
        products: action.payload,
        loading: false,
      };

    case "GET_PRODUCTS_FAILED":
      return {
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export const getProductByIdReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case "GET_PRODUCTBYID_REQUEST":
      return {
        loading: true,
      };

    case "GET_PRODUCTBYID_SUCCESS":
      return {
        product: action.payload,
        loading: false,
      };

    case "GET_PRODUCTBYID_FAILED":
      return {
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
