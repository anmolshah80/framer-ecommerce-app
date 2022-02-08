import React from "react";
import "./sidePanel.css";
import { Minimize, PlayArrow } from "@mui/icons-material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterProducts } from "../../actions/productActions";
import { getAllProducts } from "../../actions/productActions";

export default function SidePanel() {
  const [sortByCategory, setSortByCategory] = useState("all");
  const [sortByBrand, setSortByBrand] = useState("all");
  const [sortByPriceMin, setSortByPriceMin] = useState("");
  const [sortByPriceMax, setSortByPriceMax] = useState("");

  const [checkedStateCategory, setCheckedStateCategory] = useState(
    new Array(4).fill(false)
  );

  const [checkedStateBrand, setCheckedStateBrand] = useState(
    new Array(3).fill(false)
  );

  const dispatch = useDispatch();

  const handleFilterByCategory = (filterByCategory, position) => {
    setSortByCategory(filterByCategory);

    const updatedCheckedState = checkedStateCategory.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedStateCategory(updatedCheckedState);

    // updatedCheckedState.reduce((sum, currentState, index) => {
    //   if (currentState === true) {
    //     return dispatch(
    //       filterProducts(
    //         "",
    //         sortByCategory,
    //         sortByBrand,
    //         sortByPriceMin,
    //         sortByPriceMax
    //       )
    //     );
    //   }
    //   return dispatch(getAllProducts());
    // });

    if (updatedCheckedState.includes(true)) {
      console.log("re-rendered again");
      console.log("updatedCheckedState: ", updatedCheckedState);
      dispatch(
        filterProducts(
          "",
          sortByCategory,
          sortByBrand,
          sortByPriceMin,
          sortByPriceMax
        )
      );
    } else {
      console.log("re-rendered else elements");
      console.log("updatedCheckedState in else: ", updatedCheckedState);
      dispatch(getAllProducts());
    }

    // if (checkedState[position] === true) {
    //   dispatch(
    //     filterProducts(
    //       "",
    //       sortByCategory,
    //       sortByBrand,
    //       sortByPriceMin,
    //       sortByPriceMax
    //     )
    //   );
    // }
  };

  const handleFilterByBrand = async (filterByBrand, position) => {
    setSortByBrand(filterByBrand);
    setSortByCategory("all");
    setSortByPriceMin(0);
    setSortByPriceMax(100);
    const sortByQuery = "";

    const updatedCheckedState = checkedStateBrand.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedStateBrand(updatedCheckedState);

    if (updatedCheckedState.includes(true)) {
      console.log("re-rendered again brand");
      console.log("updatedCheckedState brand: ", updatedCheckedState);

      dispatch(
        filterProducts(
          sortByQuery,
          sortByCategory,
          sortByBrand,
          sortByPriceMin,
          sortByPriceMax
        )
      );

      // setTimeout(() => {
      //   console.log("timeout started!");
      // }, 3000);
    } else {
      console.log("re-rendered else elements brand");
      console.log("updatedCheckedState in else brand: ", updatedCheckedState);
      dispatch(getAllProducts());
    }
  };

  const handleFilterByPrice = (e) => {
    e.preventDefault();

    dispatch(
      filterProducts(
        "",
        sortByCategory,
        sortByBrand,
        sortByPriceMin,
        sortByPriceMax
      )
    );
  };

  return (
    <div className="side__panel">
      <h3>Categories</h3>
      <div className="categories__wrapper">
        <div className="checkbox__wrapper">
          <input
            type="checkbox"
            id="tablets"
            name="tablets"
            value={sortByCategory}
            checked={checkedStateCategory[0]}
            onChange={() => handleFilterByCategory("tablets", 0)}
          />
          <label htmlFor="tablets">Tablets</label>
        </div>
        <div className="checkbox__wrapper">
          <input
            type="checkbox"
            id="smartphone"
            name="smartphone"
            value={sortByCategory}
            checked={checkedStateCategory[1]}
            onChange={() => handleFilterByCategory("smartphone", 1)}
          />
          <label htmlFor="smartphone">Smartphone</label>
        </div>
        <div className="checkbox__wrapper">
          <input
            type="checkbox"
            id="pc"
            name="pc"
            value={sortByCategory}
            checked={checkedStateCategory[2]}
            onChange={() => handleFilterByCategory("pc", 2)}
          />
          <label htmlFor="pc">Personal Computer</label>
        </div>
        <div className="checkbox__wrapper">
          <input
            type="checkbox"
            id="smarttv"
            name="tv"
            value={sortByCategory}
            checked={checkedStateCategory[3]}
            onChange={() => handleFilterByCategory("tv", 3)}
          />
          <label htmlFor="tv">Smart TV</label>
        </div>
      </div>
      <h3>Brands</h3>
      <div className="categories__wrapper">
        <div className="checkbox__wrapper">
          <input
            type="checkbox"
            id="samsung"
            name="samsung"
            value={sortByBrand}
            checked={checkedStateBrand[0]}
            onChange={() => handleFilterByBrand("samsung", 0)}
            // onClick={() => {
            //   dispatch(
            //     filterProducts(
            //       "",
            //       sortByCategoryOrBrand,
            //       sortByBrand,
            //       sortByPriceMin,
            //       sortByPriceMax
            //     )
            //   );
            // }}
          />
          <label htmlFor="samsung">Samsung</label>
        </div>
        <div className="checkbox__wrapper">
          <input
            type="checkbox"
            id="apple"
            name="apple"
            value={sortByBrand}
            checked={checkedStateBrand[1]}
            onChange={() => handleFilterByBrand("apple", 1)}
            // onClick={() => {
            //   dispatch(
            //     filterProducts(
            //       "",
            //       sortByCategory,
            //       sortByBrand,
            //       sortByPriceMin,
            //       sortByPriceMax
            //     )
            //   );
            // }}
          />
          <label htmlFor="apple">Apple</label>
        </div>
        <div className="checkbox__wrapper">
          <input
            type="checkbox"
            id="oneplus"
            name="oneplus"
            value={sortByBrand}
            checked={checkedStateBrand[3]}
            onChange={() => handleFilterByBrand("oneplus", 3)}
          />
          <label htmlFor="oneplus">OnePlus</label>
        </div>
      </div>
      <h3>Price</h3>
      <form className="sort__byPriceRange">
        <div className="input__box">
          <input
            required
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
            required
            type="text"
            min="100"
            placeholder="Max"
            value={sortByPriceMax}
            onChange={(e) => {
              setSortByPriceMax(e.target.value);
            }}
          />
        </div>
        <button className="submit__button" onClick={handleFilterByPrice}>
          <PlayArrow className="submit__icon" />
        </button>
      </form>
    </div>
  );
}
