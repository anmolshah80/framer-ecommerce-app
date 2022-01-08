import React from "react";
import "./productDescription.css";
import Topbar from "../../components/topbar/Topbar";
import RatingsBar from "../../components/ratingsBar/RatingsBar";
import StaticData from "../../StaticData";
import { ArrowBackIosNew, Tag, Info } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function ProductDescription() {
  //   const productID = product.params.id;

  return (
    <>
      <Topbar />
      <div className="product__description">
        <div className="product__descLeft">
          <Link to="/">
            <div className="previous__page">
              <ArrowBackIosNew className="icon" />
              <span>Go back to previous page</span>
              {/* <h1>Product ID: {productID}</h1> */}
            </div>
          </Link>
          <img
            src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-12-11-select-202104_FMT_WHH?wid=2000&hei=2000&fmt=jpeg&qlt=80&.v=1617067383000"
            alt="Ipad product shots"
          />
        </div>

        <div className="product__information">
          <h2>Ipad Pro 11-inch</h2>
          <div className="product__costInfo">
            <div className="product__ratingBar">
              <span>Rating:</span>
              <span className="rating__bar">
                <RatingsBar />
              </span>
            </div>
            <div className="product__priceInfo">
              <span>Cost:</span>
              <span className="item__cost">$1199.00</span>
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
              <li>
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
              </li>
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
              <input type="text" placeholder="2" />
            </div>
            <div className="sub__totalWrapper">
              <span>Total cost:</span>
              <h3>$1199.00</h3>
            </div>
            <button className="add__toCartButton">Add to Cart</button>
          </div>
        </div>
      </div>
    </>
  );
}
