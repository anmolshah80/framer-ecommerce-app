import React from "react";
import Topbar from "../../components/topbar/Topbar";
import "./orderSummary.css";
import { Tag, Remove, Add, Clear } from "@mui/icons-material";
import AlertMessage from "../../components/alertMessages/AlertMessage";

export default function OrderSummary() {
  return (
    <React.Fragment>
      <Topbar />
      <AlertMessage />
      <div className="order__summary">
        <h1>Order Summary</h1>
        <div className="product__headingWrapper">
          {/* <Tag className="tag__icon" /> */}
          <span className="tag__icon">#</span>
          <span className="item__info">Item</span>
          <span>Price</span>
          <span>Quantity</span>
          <span className="total__priceWordWrap">Total Price</span>
          {/* <span></span> */}
        </div>
        <div className="checkout__itemsWrapper">
          <span>1</span>
          <div className="item__wrapper">
            <img
              src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-12-11-select-202104_FMT_WHH?wid=2000&hei=2000&fmt=jpeg&qlt=80&.v=1617067383000"
              alt="Ipad product shots"
            />
            <h4>Ipad Pro 11-inch</h4>
          </div>
          <span>$1199.00</span>
          <div className="quantity__selectorWrapper">
            <Remove className="icon__wrapper" />
            <span>2</span>
            <Add className="icon__wrapper" />
          </div>
          <div className="total__priceWrapper">
            <span className="total__price">$2398.00</span>
            <Clear className="icon__wrapper clear__icon" />
          </div>
        </div>

        <div className="grand__totalSection">
          <h3>Grand Total</h3>
          <span>$2398.00</span>
        </div>

        <div className="checkout__buttonSection">
          <button className="continue__shoppingButton">
            Continue Shopping
          </button>
          <button className="proceed__toCheckoutButton">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}
