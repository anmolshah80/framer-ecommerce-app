import React from "react";
import "./checkout.css";
import StripeCheckout from "react-stripe-checkout";
// const stripe = require("stripe");
import { useDispatch } from "react-redux";
import { placeOrder } from "../../actions/orderActions";

export default function Checkout({ subTotal }) {
  const STRIPE_PUBLISHABLE_KEY =
    "pk_test_51Jiu44EuyezIpgIY7AeMcK13QgHShcma7t3xFtZafdpB6B5WiEAmRCVz89FvsJZ9nAn9OiXlj8b7D105Q5K8Audj00tfuq49Ff";

  const dispatch = useDispatch();

  const tokenHandler = (token) => {
    dispatch(placeOrder(token, subTotal));
    console.log(token);
  };

  return (
    <div className="checkout">
      <StripeCheckout
        token={tokenHandler}
        amount={subTotal * 100}
        shippingAddress
        billingAddress
        currency="USD"
        stripeKey={STRIPE_PUBLISHABLE_KEY}
      ></StripeCheckout>
    </div>
  );
}
