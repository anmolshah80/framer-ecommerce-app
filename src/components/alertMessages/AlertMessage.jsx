import React from "react";
import "./alertMessage.css";
import { Clear } from "@mui/icons-material";

export default function AlertMessage({ type, message }) {
  const AlertSuccess = () => (
    <div className="alert__success">
      <div className="alert__successMessageContainer">
        <h4 className="alert__successMessageText">
          {message ? message : "An item was added to your cart."}
        </h4>
        <Clear className="icon__clear" />
      </div>
    </div>
  );

  const AlertDanger = () => (
    <div className="alert__danger">
      <div className="alert__dangerMessageContainer">
        <h4 className="alert__dangerMessageText">
          An item was removed from your cart.
        </h4>
        <Clear className="icon__clear" />
      </div>
    </div>
  );

  if (type === "alert_success") return <AlertSuccess />;
  if (type === "alert_danger") return <AlertDanger />;
}
