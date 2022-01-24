import React from "react";
import "./alertMessage.css";
import { Clear } from "@mui/icons-material";

export default function AlertMessage() {
  return (
    <div className="alert__message">
      <div className="alert__messageContainer">
        <h4 className="alert__messageText">Item was added to your cart.</h4>
        <Clear className="icon__clear" />
      </div>
    </div>
  );
}
