import React from "react";
import "./checkout.css";
import StripeCheckout from "react-stripe-checkout";
// const stripe = require("stripe");
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../../actions/orderActions";
import Skeleton from "../../components/skeleton/Skeleton";

export default function Checkout({ subTotal }) {
  const STRIPE_PUBLISHABLE_KEY =
    "pk_test_51Jiu44EuyezIpgIY7AeMcK13QgHShcma7t3xFtZafdpB6B5WiEAmRCVz89FvsJZ9nAn9OiXlj8b7D105Q5K8Audj00tfuq49Ff";

  const dispatch = useDispatch();

  const orderState = useSelector((state) => state.placeOrderReducer);

  const { loading, success, error } = orderState;

  const tokenHandler = (token) => {
    dispatch(placeOrder(token, subTotal));
    console.log(token);
  };

  return (
    <div className="checkout">
      {loading && <Skeleton type="circular_effect" />}

      {success && (
        <Skeleton
          type="custom_effect"
          message="Your order has been placed successfully"
        />
      )}

      {error && (
        <Skeleton
          type="custom_effect"
          message="Something went wrong while placing your order"
        />
      )}
      <StripeCheckout
        token={tokenHandler}
        amount={subTotal * 100}
        shippingAddress
        billingAddress
        currency="USD"
        stripeKey={STRIPE_PUBLISHABLE_KEY}
      >
        <button className="checkout__button">Check Out</button>
      </StripeCheckout>
    </div>
  );
}
