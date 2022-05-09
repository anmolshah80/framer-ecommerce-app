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
      dispatch({
        type: "GET_PRODUCTS_SUCCESS",
        payload: res.data.sort().reverse(),
      });
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

// filter products based on search query that include product title, brand or category
export const filterOnSearchQuery = (searchQuery) => (dispatch) => {
  let filteredProducts;

  const keys = ["title", "brand", "category"];

  dispatch({
    type: "GET_PRODUCTS_REQUEST",
  });

  axios
    .get("/products/all-products")
    .then(async (res) => {
      filteredProducts = res.data.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(searchQuery))
      );
      await dispatch({
        type: "GET_PRODUCTS_SUCCESS",
        payload: filteredProducts,
      });
    })
    .catch((err) => {
      dispatch({ type: "GET_PRODUCTS_FAILED" });
    });
};

// filter products based on search query that include product title, brand or category
export const filterOnCategoriesAndBrands =
  (categoryValue, brandValue) => (dispatch) => {
    let filteredProducts;

    const keys = ["brand", "category"];

    dispatch({
      type: "GET_PRODUCTS_REQUEST",
    });

    axios
      .get("/products/all-products")
      .then(async (res) => {
        filteredProducts = res.data.filter(
          (item) =>
            keys.some((key) =>
              item[key].toLowerCase().includes(categoryValue)
            ) &&
            keys.some((key) => item[key].toLowerCase().includes(brandValue))
        );
        await dispatch({
          type: "GET_PRODUCTS_SUCCESS",
          payload: filteredProducts,
        });
      })
      .catch((err) => {
        dispatch({ type: "GET_PRODUCTS_FAILED" });
      });
  };

export const filterChecks = (categoryList, brandList) => (dispatch) => {
  let filteredProducts;

  dispatch({
    type: "GET_PRODUCTS_REQUEST",
  });

  axios
    .get("/products/all-products")
    .then(async (res) => {
      filteredProducts = res.data.filter((item) => {
        if (categoryList.length > 0) {
          categoryList.includes(item.category.toLowerCase());
        }

        if (brandList.length > 0) {
          brandList.includes(item.brand.toLowerCase());
        }
      });
      await dispatch({
        type: "GET_PRODUCTS_SUCCESS",
        payload: filteredProducts,
      });
    })
    .catch((err) => {
      dispatch({ type: "GET_PRODUCTS_FAILED" });
    });
};

// filter and sort products in home page based on categories, brands and price
export const filterProducts =
  (sortByCategory, sortByBrand, sortByPrice) => (dispatch) => {
    let filteredProducts;

    dispatch({ type: "GET_PRODUCTS_REQUEST" });

    axios
      .get("/products/all-products")
      .then(async (res) => {
        if (sortByPrice !== "") {
          if (sortByPrice === "htl") {
            filteredProducts = await res.data.sort((a, b) => {
              return -a.price + b.price;
            });
          } else {
            filteredProducts = await res.data.sort((a, b) => {
              return a.price - b.price;
            });
          }
        }

        if (sortByCategory !== "" || sortByBrand !== "") {
          filteredProducts = await res.data.filter((product) => {
            return (
              product.category.toLowerCase().includes(sortByCategory) &&
              product.brand.toLowerCase().includes(sortByBrand)
            );
          });
        }

        console.log("filteredProducts: ", filteredProducts);

        await dispatch({
          type: "GET_PRODUCTS_SUCCESS",
          payload: filteredProducts,
        });
      })
      .catch((err) => {
        dispatch({ type: "GET_PRODUCTS_FAILED" });
      });
  };

// filter and sort products in home page based on categories, brands and price
export const filterSimilarItems =
  (sortByCategory, sortByBrand) => (dispatch) => {
    let filteredProducts;

    dispatch({ type: "GET_PRODUCTS_REQUEST" });

    axios
      .get("/products/all-products")
      .then(async (res) => {
        if (sortByCategory !== "" || sortByBrand !== "") {
          filteredProducts = await res.data.filter((product) => {
            return (
              product.category.toLowerCase().includes(sortByCategory) &&
              product.brand.toLowerCase().includes(sortByBrand)
            );
          });
        }

        console.log("filteredProducts: ", filteredProducts);

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
