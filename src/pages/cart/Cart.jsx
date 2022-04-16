import React from "react";
import Topbar from "../../components/topbar/Topbar";
import "./cart.css";
import { useState } from "react";
import { Clear } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../actions/cartActions";
import { Link } from "react-router-dom";
import Checkout from "../checkout/Checkout";
import { useNavigate } from "react-router-dom";
// import { placeOrderViaCheckoutSession } from "../../actions/orderActions";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import Skeleton from "../../components/skeleton/Skeleton";

export default function Cart() {
  const cartReducerState = useSelector((state) => state.cartReducer);

  const dispatch = useDispatch();

  const { cartItems } = cartReducerState;

  const grandTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0.0
  );

  const localCartItems = JSON.parse(localStorage.getItem("cartItems"));
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const [open, setOpen] = useState(true);

  const orderState = useSelector((state) => state.placeOrderReducer);

  const { loading, success, error } = orderState;

  success &&
    setTimeout(() => {
      localStorage.removeItem("cartItems");
      console.log("cartItems deleted from local storage");
      navigate("/orders");
      window.location.reload();
    }, 3000);

  const handleCheckout = () => {
    // dispatch(placeOrderViaCheckoutSession(grandTotal));
    // fetch("/create-checkout-session", {

    if (currentUser) {
      fetch("http://localhost:8800/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: localCartItems,
          user: currentUser,
          subTotal: grandTotal,
        }),
      })
        .then((res) => {
          if (res.ok) return res.json();
          return res.json().then((e) => Promise.reject(e));
        })
        .then(({ url, id, session }) => {
          window.location = url;
          // console.log("session id: ", id);
          // console.log("session: ", session);
        })
        .catch((e) => {
          console.error(e.error);
        });
    } else {
      navigate("/login");
    }
  };

  return (
    <React.Fragment>
      <Topbar />
      <div className="cart">
        <h1>Review your cart</h1>

        {loading ? (
          <Skeleton type="custom_effect" />
        ) : success ? (
          <Box sx={{ width: "100%", mt: 2 }}>
            <Collapse in={open}>
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2, mr: 0 }}
              >
                Your order has been placed successfully.
              </Alert>
            </Collapse>
          </Box>
        ) : (
          error && (
            <Box sx={{ width: "100%", mt: 2 }}>
              <Collapse in={open}>
                <Alert
                  severity="error"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2, mr: 0 }}
                >
                  There was an error while placing your order.
                </Alert>
              </Collapse>
            </Box>
          )
        )}

        <div className="product__headingWrapper">
          {/* <Tag className="tag__icon" /> */}
          <span className="tag__icon">#</span>
          <span className="item__info">Item</span>
          <span>Price</span>
          <span>Quantity</span>
          <span className="total__priceWordWrap">Total Price</span>
          {/* <span></span> */}
        </div>

        {cartItems.map((item, i) => {
          return (
            <div className="checkout__itemsWrapper">
              <span>{i + 1}</span>
              <div className="item__wrapper">
                <img src={item.image} alt="Ipad product shots" />
                <h4>{item.title}</h4>
              </div>
              <span>${item.price.toFixed(2)}</span>
              <div className="quantity__selectorWrapper">
                <select
                  className="select__productQuantity"
                  value={item.quantity}
                  onChange={(e) => dispatch(addToCart(item, e.target.value))}
                >
                  {[...Array(item.countInStock).keys()].map((x, i) => {
                    if (i + 1 < 11) {
                      return <option value={i + 1}>{i + 1}</option>;
                    }
                  })}
                </select>
              </div>
              <div className="total__priceWrapper">
                <span className="total__price">
                  ${(item.quantity * item.price).toFixed(2)}
                </span>
                <Clear
                  className="icon__wrapper clear__icon"
                  onClick={() => dispatch(removeFromCart(item))}
                />
              </div>
            </div>
          );
        })}

        <div className="grand__totalSection">
          <h3>Grand Total</h3>
          <span>${grandTotal.toFixed(2)}</span>
        </div>

        <div className="checkout__buttonSection">
          <Link to="/">
            <button className="continue__shoppingButton">
              Continue Shopping
            </button>
          </Link>
          {/* <Link to="/checkout"> */}
          {currentUser ? (
            cartItems?.length > 0 && (
              // <button
              //   className="proceed__toCheckoutButton"
              //   onClick={handleCheckout}
              // >
              //   Proceed to Checkout
              // </button>
              <Checkout subTotal={grandTotal} />
            )
          ) : (
            <button
              className="proceed__toCheckoutButton"
              onClick={handleCheckout}
            >
              Login to Checkout
            </button>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
