import React from "react";
import "./checkout.css";
import StripeCheckout from "react-stripe-checkout";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../../actions/orderActions";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Checkout({ subTotal }) {
  const STRIPE_PUBLISHABLE_KEY =
    "pk_test_51Jiu44EuyezIpgIY7AeMcK13QgHShcma7t3xFtZafdpB6B5WiEAmRCVz89FvsJZ9nAn9OiXlj8b7D105Q5K8Audj00tfuq49Ff";

  const dispatch = useDispatch();

  const orderState = useSelector((state) => state.placeOrderReducer);

  const { error } = orderState;

  const currentUserState = useSelector((state) => state.loginUserReducer);

  const { currentUser } = currentUserState;

  const tokenHandler = (token) => {
    dispatch(placeOrder(token, subTotal));
    console.log(token);
  };

  const navigate = useNavigate();

  const handlePaymentCancellation = () => {
    if (error) {
      setTimeout(() => {
        navigate("/payment-canceled");
        window.location.reload();
      }, 3000);
    }
  };

  // useEffect(() => {
  //   if (currentUser === null) {
  //     window.location.href = "/login";
  //   } else {
  //     window.location.href = "/cart";
  //   }
  // }, [currentUser])

  const validateLoginStatus = () => {
    if (currentUser === null) {
      window.location.href = "/login";
    } else {
      window.location.href = "/cart";
    }
  };

  return (
    <div className="checkout">
      <StripeCheckout
        token={tokenHandler}
        amount={subTotal * 100}
        shippingAddress
        billingAddress
        email={currentUser.email}
        name={currentUser.username}
        currency="USD"
        stripeKey={STRIPE_PUBLISHABLE_KEY}
        allowRememberMe
        closed={handlePaymentCancellation}
      >
        {currentUser === null ? (
          <button className="checkout__button" onClick={validateLoginStatus}>
            Login to Checkout
          </button>
        ) : (
          <button className="checkout__button">Proceed to Checkout</button>
        )}
      </StripeCheckout>
    </div>
  );
}
