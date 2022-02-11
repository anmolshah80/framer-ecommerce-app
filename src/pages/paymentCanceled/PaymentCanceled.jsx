import React from "react";
import "./paymentCanceled.css";
import Topbar from "../../components/topbar/Topbar";
import { WarningAmber } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function PaymentCanceled() {
  return (
    <React.Fragment>
      <Topbar />
      <div className="payment__canceledContainer">
        <div className="payment__canceledSubContainer">
          <div className="payment__canceled">
            <div className="warning__amber">
              <WarningAmber className="warning__icon" />
            </div>
            <h2 className="cancel__header">Payment Unsuccessful</h2>
            <p className="cancel__reason">
              For some reason your payment could not be completed
            </p>
            <div className="payment__canceledButtons">
              <Link to="/contact-us">
                <button className="contact__usButton">Contact Us</button>
              </Link>
              <Link to="/cart">
                <button className="try__againButton">Try again</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
