export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const itemAlreadyAdded = state.cartItems.find(
        (item) => item._id == action.payload._id
      );

      if (itemAlreadyAdded) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item._id == action.payload._id ? action.payload : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => {
          return item._id !== action.payload._id;
        }),
      };

    default:
      return state;
  }
};
