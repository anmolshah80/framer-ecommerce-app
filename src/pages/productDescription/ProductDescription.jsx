import React, { useState, useEffect } from "react";
import "./productDescription.css";
import Topbar from "../../components/topbar/Topbar";
import RatingsBar from "../../components/ratingsBar/RatingsBar";
// import Rating from "react-rating";
// import OrderSummary from "../orderSummary/OrderSummary";
// import StaticData from "../../StaticData";
import { ArrowBackIosNew, Tag, Info } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../actions/productActions";
import { addToCart } from "../../actions/cartActions";

export default function ProductDescription() {
  const product_id = useParams();

  // const product = StaticData.find((product) => product.id == product_id.id);

  const desc_regex = /[.]+/;

  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);

  const addToCartHandler = () => {
    dispatch(addToCart(product, quantity));
  };

  const getProductByIdState = useSelector(
    (state) => state.getProductByIdReducer
  );

  const { product, loading, error } = getProductByIdState;

  // const product_desc = String(product.description).split(desc_regex)
  //   .filter(Boolean)
  //   .map((s) => s.trim());

  useEffect(() => {
    dispatch(getProductById(product_id.id));
  }, []);

  return (
    <React.Fragment>
      <Topbar />

      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>Could not load product description page. Please try again.</h1>
      ) : (
        <div className="product__description">
          <div className="product__descLeft">
            <Link to="/">
              <div className="previous__page">
                <ArrowBackIosNew className="icon" />
                <span>Go back to previous page</span>
              </div>
            </Link>
            <img src={product.image} alt={product.title} />
          </div>

          <div className="product__information">
            <h2>{product.title}</h2>
            <div className="product__costInfo">
              <div className="product__ratingBar">
                <span>Rating:</span>
                <span className="rating__bar">
                  <RatingsBar />
                  {/* <Rating /> */}
                </span>
              </div>
              <div className="product__priceInfo">
                <span>Cost:</span>
                <span className="item__cost">${product.price}</span>
              </div>
            </div>

            <div className="color__desc">
              <span>Color: Space Gray</span>
              <span>Size: 32 GB</span>
            </div>

            <div className="available__variants">
              <h4>32 GB</h4>
              <h4>64 GB</h4>
            </div>

            <div className="product__details">
              <h3>Product Details </h3>
              <ul>
                {String(product.description)
                  .split(desc_regex)
                  .filter(Boolean)
                  .map((str) => {
                    return <li>{str.trim()}</li>;
                  })}
              </ul>
            </div>
          </div>

          <div className="delivery__options">
            <div className="delivery__wordWrap">
              <span>Delivery Options</span>
              <Info className="info__icon" />
            </div>
            <div className="user__address">
              <h4>Bagmati, Kathmandu</h4>
              <h4>Metro 22 - Newroad Area, Newroad</h4>
              <h4>Home Delivery</h4>
              <h4>Cash on Delivery Available</h4>
              <div className="returns__wordWrap">
                <span>Returns & Warranty</span>
                <Info className="info__icon" />
              </div>
            </div>
            <div className="warranty__info">
              <h4>7 Days Returns</h4>
              <h4>Warranty not available</h4>
            </div>
            <div className="sub__totalSection">
              <span>Quantity</span>
              <div className="quantity__selector">
                {/* <input type="text" placeholder="2" /> */}
                <select
                  className="select__productQuantity"
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(e.target.value);
                  }}
                >
                  {[...Array(product.countInStock).keys()].map((x, i) => {
                    if (i + 1 < 11) {
                      return <option value={i + 1}>{i + 1}</option>;
                    }
                  })}
                </select>
              </div>
              <div className="sub__totalWrapper">
                <span>Total cost:</span>
                <h3>${quantity * product.price}</h3>
              </div>
              <Link to="/cart">
                <button
                  className="add__toCartButton"
                  onClick={addToCartHandler}
                >
                  Add to Cart
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
