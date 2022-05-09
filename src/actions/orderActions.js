import axios from "axios";

export const placeOrder = (token, subTotal) => (dispatch, getState) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const localCartItems = getState().cartReducer.cartItems;
  const cartItems = new Array();
  for (let i = 0; i < localCartItems.length; i++) {
    let item = {
      title: localCartItems[i].title,
      quantity: localCartItems[i].quantity,
      price: localCartItems[i].price,
      _id: localCartItems[i]._id,
    };
    cartItems.push(item);
  }
  dispatch({ type: "PLACE_ORDER_REQUEST" });
  axios
    .post("/orders/place-order", {
      token,
      subTotal,
      currentUser,
      cartItems,
    })
    .then((res) => {
      dispatch({ type: "PLACE_ORDER_SUCCESS" });
      console.log(res);
    })
    .catch((err) => {
      dispatch({ type: "PLACE_ORDER_FAILED" });
    });
};

// Stripe Checkout through session  => has bugs (needs to be fixed)
// export const placeOrderViaCheckoutSession =
//   (subTotal) => (dispatch, getState) => {
//     const currentUser = JSON.parse(localStorage.getItem("user"));
//     const localCartItems = getState().cartReducer.cartItems;

//     let cartItems = new Array();

//     for (let i = 0; i < localCartItems.length; i++) {
//       let item = {
//         title: localCartItems[i].title,
//         quantity: localCartItems[i].quantity,
//         price: localCartItems[i].price,
//         _id: localCartItems[i]._id,
//         image: localCartItems[i].image,
//       };

//       cartItems.push(item);
//     }

//     console.log("localCartItems", localCartItems);

//     console.log("cartItems:", cartItems);

//     dispatch({ type: "PLACE_ORDER_REQUEST" });

//     axios
//       .post("/create-checkout-session/place-order", {
//         items: localCartItems,
//         user: currentUser,
//         subTotal: subTotal,
//       })
//       .then((res) => {
//         dispatch({ type: "PLACE_ORDER_SUCCESS" });
//         console.log(res);
//       })
//       .catch((err) => {
//         dispatch({ type: "PLACE_ORDER_FAILED" });
//       });
//   };

// fetch all the orders placed by a user
export const getOrdersByUserID = (userId) => (dispatch) => {
  dispatch({ type: "GET_ORDERSBYUSERID_REQUEST" });

  axios
    .post("/orders/ordersbyuserid", { userID: userId })
    .then((res) => {
      dispatch({
        type: "GET_ORDERSBYUSERID_SUCCESS",
        payload: res.data.sort().reverse(),
      });
      // console.log(res.data);
    })
    .catch((err) => {
      dispatch({ type: "GET_ORDERSBYUSERID_FAILED", payload: err });
    });
};

// fetch an entire order description of an order based on order ID
export const getOrderDescByID = (orderID) => (dispatch, getState) => {
  dispatch({ type: "GET_ORDERDESCBYID_REQUEST" });

  axios
    .post("/orders/orderdescbyid", { orderID: orderID })
    .then((res) => {
      dispatch({ type: "GET_ORDERDESCBYID_SUCCESS", payload: res.data });
      // console.log(res.data);
    })
    .catch((err) => {
      dispatch({ type: "GET_ORDERDESCBYID_FAILED", payload: err });
    });
};

// fetch all orders data from database
export const getAllOrders = () => async (dispatch) => {
  dispatch({
    type: "GET_ORDERS_REQUEST",
  });

  await axios
    .get("/orders/all-orders")
    .then((res) => {
      console.log(res);
      dispatch({ type: "GET_ORDERS_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: "GET_ORDERS_FAILED", payload: err });
    });
};
