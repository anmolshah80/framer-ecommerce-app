import React from "react";
import "./sidePanel.css";
import { Minimize, PlayArrow } from "@mui/icons-material";

export default function SidePanel() {
  return (
    <div className="side__panel">
      <h3>Categories</h3>
      <div className="categories__wrapper">
        <div className="checkbox__wrapper">
          <input type="checkbox" id="tablets" name="tablets" />
          <label for="tablets">Tablets</label>
        </div>
        <div className="checkbox__wrapper">
          <input type="checkbox" id="smartphone" name="smartphone" />
          <label for="smartphone">Smartphone</label>
        </div>
        <div className="checkbox__wrapper">
          <input type="checkbox" id="oneplus" name="pc" />
          <label for="pc">Personal Computer</label>
        </div>
        <div className="checkbox__wrapper">
          <input type="checkbox" id="smarttv" name="smarttv" />
          <label for="smarttv">Smart TV</label>
        </div>
      </div>
      <h3>Brands</h3>
      <div className="categories__wrapper">
        <div className="checkbox__wrapper">
          <input type="checkbox" id="samsung" name="samsung" />
          <label for="samsung">Samsung</label>
        </div>
        <div className="checkbox__wrapper">
          <input type="checkbox" id="apple" name="apple" />
          <label for="apple">Apple</label>
        </div>
        <div className="checkbox__wrapper">
          <input type="checkbox" id="oneplus" name="oneplus" />
          <label for="oneplus">OnePlus</label>
        </div>
      </div>
      <h3>Price</h3>
      <div className="input__box">
        <input type="text" placeholder="Min" />
        <Minimize className="price__rangeIcon" />
        <input type="text" placeholder="Max" />
      </div>
      <button className="submit__button">
        <PlayArrow className="submit__icon" />
      </button>
    </div>
  );
}
