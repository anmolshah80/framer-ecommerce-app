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
