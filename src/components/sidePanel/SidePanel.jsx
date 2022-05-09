import React from "react";
import "./sidePanel.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterProducts } from "../../actions/productActions";

export default function SidePanel() {
  const [sortByCategory, setSortByCategory] = useState("");
  const [sortByBrand, setSortByBrand] = useState("");
  const [sortByPrice, setSortByPrice] = useState("");

  const dispatch = useDispatch();

  return (
    <div className="side__panel">
      <h3>Categories</h3>
      <div className="categories__wrapper">
        <select
          className="selection__listContainer"
          value={sortByCategory}
          onChange={(e) => {
            setSortByCategory(e.target.value);
          }}
        >
          <option value="">--Select a category--</option>
          <option value="tablets">Tablets</option>
          <option value="phone">Smartphone</option>
          <option value="laptop">Laptop</option>
          <option value="smart tv">Smart TV</option>
        </select>
      </div>
      <h3>Brands</h3>
      <div className="brands__wrapper">
        <select
          className="selection__listContainer"
          value={sortByBrand}
          onChange={(e) => {
            setSortByBrand(e.target.value);
          }}
        >
          <option value="">--Select a brand--</option>
          <option value="samsung">Samsung</option>
          <option value="apple">Apple</option>
          <option value="oneplus">OnePlus</option>
          <option value="sony">Sony</option>
        </select>
      </div>
      <h3>Price ($)</h3>

      <div className="price__wrapper">
        <select
          className="selection__listContainer"
          value={sortByPrice}
          onChange={(e) => {
            setSortByPrice(e.target.value);
          }}
        >
          <option value="">--Select a pricing option--</option>
          <option value="htl">High to Low</option>
          <option value="lth">Low to High</option>
        </select>
      </div>

      <button
        className="filter__button"
        onClick={() => {
          if (
            sortByCategory !== "" ||
            sortByBrand !== "" ||
            sortByPrice !== ""
          ) {
            dispatch(filterProducts(sortByCategory, sortByBrand, sortByPrice));
          }
        }}
      >
        Filter
      </button>
    </div>
  );
}
