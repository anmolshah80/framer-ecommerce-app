import React from "react";
import Topbar from "../../components/topbar/Topbar";
import "./cart.css";
import { Tag, Remove, Add, Clear } from "@mui/icons-material";
import AlertMessage from "../../components/alertMessages/AlertMessage";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../actions/cartActions";
import { Link } from "react-router-dom";

export default function Cart() {
  const cartReducerState = useSelector((state) => state.cartReducer);

  const dispatch = useDispatch();

  const { cartItems } = cartReducerState;

  const grandTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0.0
  );

  return (
    <React.Fragment>
      <Topbar />
      <AlertMessage />
      <div className="cart">
        <h1>Review your cart</h1>
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
          <button className="proceed__toCheckoutButton">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}
