import axios from "axios";

// fetch all the product data from database
export const getAllProducts = () => async (dispatch) => {
  dispatch({
    type: "GET_PRODUCTS_REQUEST",
  });

  await axios
    .get("/products/all-products")
    .then((res) => {
      // console.log(res);
      dispatch({ type: "GET_PRODUCTS_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      // console.log(err);
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
      // console.log(res);
      dispatch({ type: "GET_PRODUCTBYID_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      // console.log(err);
      dispatch({ type: "GET_PRODUCTBYID_FAILED", payload: err });
    });
};

// filter and sort products in home page based on categories, brands and price
export const filterProducts =
  (searchQuery, sortByCategory, sortByBrand, sortByPriceMin, sortByPriceMax) =>
  (dispatch) => {
    let filteredProducts;

    dispatch({ type: "GET_PRODUCTS_REQUEST" });

    axios
      .get("/products/all-products")
      .then(async (res) => {
        if (searchQuery) {
          searchQuery = searchQuery.toLowerCase();
          filteredProducts = res.data.filter((product) => {
            return (
              product.title.toLowerCase().includes(searchQuery) ||
              product.category.toLowerCase().includes(searchQuery) ||
              product.brand.toLowerCase().includes(searchQuery)
            );
          });
        }

        if (parseInt(sortByPriceMin) > 0 && parseInt(sortByPriceMax) > 0) {
          filteredProducts = await res.data.filter((product) => {
            return (
              Math.floor(product.price) >= Math.floor(sortByPriceMin) &&
              Math.floor(product.price) <= Math.floor(sortByPriceMax)
            );
          });
        }

        if (sortByCategory !== "all") {
          filteredProducts = await res.data.filter((product) => {
            return product.category
              .toLowerCase()
              .includes(sortByCategory.toLowerCase());
          });
        } else {
          filteredProducts = res.data;
        }

        if (sortByBrand !== "all") {
          filteredProducts = await res.data.filter((product) => {
            return product.brand
              .toLowerCase()
              .includes(sortByBrand.toLowerCase());
          });
        } else {
          filteredProducts = res.data;
        }

        // setTimeout(() => {
        //   console.log("timeout started in backend");
        // }, 3000);

        await dispatch({
          type: "GET_PRODUCTS_SUCCESS",
          payload: filteredProducts,
        });
      })
      .catch((err) => {
        dispatch({ type: "GET_PRODUCTS_FAILED" });
      });
  };

export const addProductReview = (review, product_id) => (dispatch) => {
  dispatch({ type: "ADD_PRODUCTREVIEW_REQUEST" });

  const currentUser = JSON.parse(localStorage.getItem("user"));

  axios
    .post("/products/add-review", { review, product_id, currentUser })
    .then((res) => {
      // console.log(res);
      dispatch({ type: "ADD_PRODUCTREVIEW_SUCCESS" });
    })
    .catch((err) => {
      dispatch({ type: "ADD_PRODUCTREVIEW_FAILED" });
    });
};

// user action to allow users delete the own reviews added
// in several products based on productId
export const deleteProductReview = (productId, userId) => (dispatch) => {
  dispatch({ type: "DELETE_PRODUCTREVIEW_REQUEST" });

  axios
    .post("/products/delete-review", { productId, userId })
    .then((res) => {
      dispatch({ type: "DELETE_PRODUCTREVIEW_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: "DELETE_PRODUCTREVIEW_FAILED", payload: err });
    });
};
