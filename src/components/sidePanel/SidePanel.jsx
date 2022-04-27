import React from "react";
import "./sidePanel.css";
import { Minimize, PlayArrow } from "@mui/icons-material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterProducts } from "../../actions/productActions";

export default function SidePanel() {
  const [sortByCategory, setSortByCategory] = useState("");
  const [sortByBrand, setSortByBrand] = useState("");
  const [sortByPriceMin, setSortByPriceMin] = useState("");
  const [sortByPriceMax, setSortByPriceMax] = useState("");

  const dispatch = useDispatch();

  // const handleFilterByPrice = (e) => {
  //   e.preventDefault();

  //   dispatch(
  //     filterProducts(
  //       "",
  //       sortByCategory,
  //       sortByBrand,
  //       sortByPriceMin,
  //       sortByPriceMax
  //     )
  //   );
  // };

  // const handleFilter = (e) => {
  //   e.preventDefault();

  //   dispatch(
  //     filterProducts(
  //       "",
  //       sortByCategory,
  //       sortByBrand,
  //       sortByPriceMin,
  //       sortByPriceMax
  //     )
  //   );

  //   console.log("sortByCategory: ", sortByCategory);
  //   console.log("sortByBrand: ", sortByBrand);
  // };

  return (
    <div className="side__panel">
      <h3>Categories</h3>
      <div className="categories__wrapper">
        <div className="checkbox__wrapper">
          <input
            type="radio"
            id="all"
            name="category"
            value={sortByCategory}
            onChange={() => setSortByCategory("all")}
          />
          <label htmlFor="all">All</label>
        </div>
        <div className="checkbox__wrapper">
          <input
            type="radio"
            id="tablets"
            name="category"
            value={sortByCategory}
            onChange={() => setSortByCategory("Tablets")}
          />
          <label htmlFor="tablets">Tablets</label>
        </div>
        <div className="checkbox__wrapper">
          <input
            type="radio"
            id="smartphone"
            name="category"
            value={sortByCategory}
            onChange={() => setSortByCategory("Phone")}
          />
          <label htmlFor="smartphone">Smartphone</label>
        </div>
        <div className="checkbox__wrapper">
          <input
            type="radio"
            id="pc"
            name="category"
            value={sortByCategory}
            onChange={() => setSortByCategory("Laptop")}
          />
          <label htmlFor="pc">Personal Computer</label>
        </div>
        <div className="checkbox__wrapper">
          <input
            type="radio"
            id="smarttv"
            name="category"
            value={sortByCategory}
            onChange={() => setSortByCategory("Smart TV")}
          />
          <label htmlFor="smarttv">Smart TV</label>
        </div>
      </div>
      <h3>Brands</h3>
      <div className="categories__wrapper">
        {/* <div className="checkbox__wrapper">
          <input
            type="radio"
            id="all"
            name="category"
            value={sortByBrand}
            onChange={() => setSortByBrand("all")}
          />
          <label htmlFor="all">All</label>
        </div> */}
        <div className="checkbox__wrapper">
          <input
            type="radio"
            id="samsung"
            name="category"
            value={sortByBrand}
            onChange={() => setSortByBrand("samsung")}
          />
          <label htmlFor="samsung">Samsung</label>
        </div>
        <div className="checkbox__wrapper">
          <input
            type="radio"
            id="apple"
            name="category"
            value={sortByBrand}
            onChange={() => setSortByBrand("apple")}
          />
          <label htmlFor="apple">Apple</label>
        </div>
        <div className="checkbox__wrapper">
          <input
            type="radio"
            id="oneplus"
            name="category"
            value={sortByBrand}
            onChange={() => setSortByBrand("oneplus")}
          />
          <label htmlFor="oneplus">OnePlus</label>
        </div>
      </div>
      <h3>Price ($)</h3>
      <form className="sort__byPriceRange">
        <div className="input__box">
          <input
            type="text"
            min="0"
            placeholder="Min"
            value={sortByPriceMin}
            onChange={(e) => {
              setSortByPriceMin(e.target.value);
            }}
          />
          <Minimize className="price__rangeIcon" />
          <input
            type="text"
            min="100"
            placeholder="Max"
            value={sortByPriceMax}
            onChange={(e) => {
              setSortByPriceMax(e.target.value);
            }}
          />
        </div>
        <button
          className="submit__button"
          // onClick={handleFilterByPrice}
          onClick={(e) => {
            e.preventDefault();

            console.log("sortByCategory: ", sortByCategory);
            console.log("sortByBrand: ", sortByBrand);

            dispatch(
              filterProducts(
                "",
                sortByCategory,
                sortByBrand,
                sortByPriceMin,
                sortByPriceMax
              )
            );
          }}
        >
          <PlayArrow
            className="submit__icon"
            // onClick={(e) => handleFilter(e)}
          />
        </button>
      </form>
    </div>
  );
}
