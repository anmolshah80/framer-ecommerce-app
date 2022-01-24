import React from "react";
import "./productDescription.css";
import Topbar from "../../components/topbar/Topbar";
import RatingsBar from "../../components/ratingsBar/RatingsBar";
import Rating from "react-rating";
import OrderSummary from "../orderSummary/OrderSummary";
import StaticData from "../../StaticData";
import { ArrowBackIosNew, Tag, Info } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";

export default function ProductDescription() {
  const product_id = useParams();

  const product = StaticData.find((product) => product.id == product_id.id);

  const desc_regex = /[.]+/;

  // const product_desc = product.description
  //   .split(desc_regex)
  //   .filter(Boolean)
  //   .map((s) => s.trim());

  // console.log(product_desc);

  return (
    <React.Fragment>
      <Topbar />
      <div className="product__description">
        <div className="product__descLeft">
          <Link to="/">
            <div className="previous__page">
              <ArrowBackIosNew className="icon" />
              <span>Go back to previous page</span>
              {/* <h1>Product ID: {product_id.id}</h1>
              <h1>Product Name: {product.title}</h1> */}
            </div>
          </Link>
          <img src={product.image} alt={product.alt} />
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
              {/* <li>
                The ultimate iPad experience. Now with breakthrough M1
                performance, a breathtaking XDR display, and blazing‑fast 5G
                wireless. Buckle up.
              </li>
              <li>
                Faster performance and graphics. The 8‑core CPU of M1 delivers
                up to 50 percent faster performance. And M1 has an 8‑core GPU in
                a class of its own, providing up to 40 percent faster graphics
                performance to iPad Pro.
              </li>
              <li>
                Extreme dynamic range comes to the 12.9-inch iPad Pro. The
                Liquid Retina XDR display delivers true-to-life detail with a
                1,000,000:1 contrast ratio, great for viewing and editing HDR
                photos and videos or enjoying your favorite movies and TV shows.
              </li>
              <li>
                Ultra Wide camera with Center Stage. iPad Pro features a new
                Ultra Wide camera with a 12MP sensor and a 122‑degree field of
                view, making it perfect for FaceTime and the new Center Stage
                feature.
              </li> */}

              {product.description
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
              <select className="select__productQuantity">
                {[...Array(product.countInStock).keys()].map((x, i) => {
                  if (i + 1 < 11) {
                    return <option value={i + 1}>{i + 1}</option>;
                  }
                })}
              </select>
            </div>
            <div className="sub__totalWrapper">
              <span>Total cost:</span>
              <h3>${product.price}</h3>
            </div>
            <Link to="/order-summary">
              <button className="add__toCartButton">Add to Cart</button>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
