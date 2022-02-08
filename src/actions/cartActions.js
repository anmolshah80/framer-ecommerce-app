export const addToCart = (product, quantity) => (dispatch, getState) => {
  const cartItem = {
    _id: product._id,
    title: product.title,
    image: product.image,
    price: product.price,
    countInStock: product.countInStock,
    quantity: quantity,
  };

  dispatch({ type: "ADD_TO_CART", payload: cartItem });

  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cartReducer.cartItems)
  );
};

export const removeFromCart = (item) => (dispatch, getState) => {
  dispatch({ type: "REMOVE_FROM_CART", payload: item });

  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cartReducer.cartItems)
  );
};
