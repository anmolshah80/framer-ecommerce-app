import axios from "axios";

// fetch all the product data from database
export const getAllProducts = () => async (dispatch) => {
  dispatch({
    type: "GET_PRODUCTS_REQUEST",
  });

  await axios
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

// filter and sort products in home page based on categories, brands and price
export const filterProducts =
  (searchQuery, sortByCategory, sortByBrand, sortByPriceMin, sortByPriceMax) =>
  (dispatch) => {
    let filteredProducts;

    dispatch({ type: "GET_PRODUCTS_REQUEST" });

    axios
      .get("/products/all-products")
      .then(async (res) => {
        // filteredProducts = res.data;

        if (searchQuery) {
          filteredProducts = res.data.filter((product) => {
            return product.title.toLowerCase().includes(searchQuery);
          });
        }

        if (parseInt(sortByPriceMin) > 0 && parseInt(sortByPriceMax) > 0) {
          // console.log("typeof(sortByPriceMin): ", typeof sortByPriceMin);
          // console.log("typeof(sortByPriceMax): ", typeof sortByPriceMax);

          filteredProducts = res.data.sort((a, b) => {
            return a.price - b.price;
          });
        }

        if (sortByCategory !== "all") {
          filteredProducts = res.data.filter((product) => {
            return product.category.toLowerCase().includes(sortByCategory);
          });
        }

        if (sortByBrand !== "all") {
          filteredProducts = res.data.filter((product) => {
            return product.brand.toLowerCase().includes(sortByBrand);
          });
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
