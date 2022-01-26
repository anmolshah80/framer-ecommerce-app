import axios from "axios";

// fetch all the product data from database
export const getAllProducts = () => (dispatch) => {
  dispatch({
    type: "GET_PRODUCTS_REQUEST",
  });

  axios
    .get("/products/all-products")
    .then((res) => {
      console.log(res);
      dispatch({ type: "GET_PRODUCTS_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: "GET_PRODUCTS_FAILED", payload: err });
    });
};

// fetch a product based on its id
export const getProductById = (product_id) => (dispatch) => {
  dispatch({
    type: "GET_PRODUCTBYID_REQUEST",
  });

  axios
    .post("/products/productbyid", { product_id })
    .then((res) => {
      console.log(res);
      dispatch({ type: "GET_PRODUCTBYID_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: "GET_PRODUCTBYID_FAILED", payload: err });
    });
};
