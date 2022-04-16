import React, { useState, useEffect } from "react";
import "./productDescription.css";
import Topbar from "../../components/topbar/Topbar";
// import RatingsBar from "../../components/ratingsBar/RatingsBar";
// import Rating from "react-rating";
// import ReactStars from "react-rating-stars-component";
import Rating from "@mui/material/Rating";
// import OrderSummary from "../orderSummary/OrderSummary";
// import StaticData from "../../StaticData";
import {
  ArrowBackIosNew,
  Info,
  KeyboardArrowUp,
  KeyboardArrowDown,
} from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../actions/productActions";
// import { getOrdersByUserID } from "../../actions/orderActions";
import { addToCart } from "../../actions/cartActions";
import Skeleton from "../../components/skeleton/Skeleton";
import Reviews from "../../components/reviews/Reviews";
import AddReview from "../../components/reviews/AddReview";
import useCollapse from "react-collapsed";

export default function ProductDescription() {
  function CollapsibleSection(props) {
    const config = {
      defaultExpanded: props.defaultExpanded || false,
      collapsedHeight: props.collapsedHeight || 0,
    };

    const { getCollapseProps, getToggleProps, isExpanded } =
      useCollapse(config);

    return (
      <div className="collapsible">
        <div className="header" {...getToggleProps()}>
          <p className="title">{isExpanded ? "Show less" : "Show more"}</p>
          <p className="icon">
            {isExpanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </p>
        </div>
        <div {...getCollapseProps()}>
          <div className="content" isexpanded={isExpanded.toString()}>
            {props.children}
          </div>
        </div>
      </div>
    );
  }

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

  useEffect(() => {
    dispatch(getProductById(product_id.id));
  }, []);

  // check if the user has purchased the product (induces performance issues)
  // let isVerifiedPurchase = false;

  // const navigate = useNavigate();

  // const getCurrentUserOrdersState = useSelector(
  //   (state) => state.getOrdersByUserIDReducer
  // );

  // const { orders, loadingOrders, errorOrders } = getCurrentUserOrdersState;

  // useEffect(() => {
  //   if (localStorage.getItem("user")) {
  //     dispatch(getOrdersByUserID());
  //   } else {
  //     navigate("/login");
  //   }
  // }, [dispatch]);

  // console.log("orders: ", orders);

  // for (let i = 0; i < orders?.length; i++) {
  //   for (let j = 0; j < orders[i].orderItems.length; j++) {
  //     if (orders[i].orderItems[j]._id == product_id.id) {
  //       isVerifiedPurchase = true;
  //     }
  //   }
  // }

  return (
    <React.Fragment>
      <Topbar loading={loading} />

      {loading ? (
        <Skeleton type="circular_effect" />
      ) : error ? (
        <Skeleton
          type="custom_effect"
          message="Could not load product description page. Please try again."
        />
      ) : (
        <>
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
                    <Rating
                      name="half-rating-read"
                      defaultValue={product.rating}
                      precision={0.5}
                      size="large"
                      color="#fd4"
                      readOnly
                    />
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
                {/* <ul>
                  {String(product.description)
                    .split(desc_regex)
                    .filter(Boolean)
                    .map((str, index) => {
                      return <li key={index}>{str.trim()}</li>;
                    })}
                </ul> */}

                <ul>
                  {String(product.description)
                    .substring(0, 510)
                    .split(desc_regex)
                    .map((str, index) => {
                      return (
                        <li className="product__descList" key={index}>
                          {str.trim()}
                        </li>
                      );
                    })}
                </ul>

                <CollapsibleSection>
                  <ul className="product__descListContainer">
                    {String(product.description)
                      .substring(511)
                      .split(desc_regex)
                      .map((str, index) => {
                        return (
                          <li
                            // className="product__descListInCollapsible"
                            style={{
                              marginLeft: "-20px",
                              listStyleType: "circle",
                              marginBottom: "10px",
                              fontSize: "15px",
                              fontWeight: "500",
                            }}
                            key={index}
                          >
                            {str.trim()}
                          </li>
                        );
                      })}
                  </ul>
                </CollapsibleSection>
              </div>
            </div>

            <div className="delivery__options">
              <div className="delivery__wordWrap">
                <span>Delivery Options</span>
                <Info className="info__icon" />
              </div>
              <div className="user__address">
                <h4>Bagmati, Kathmandu</h4>
                <h4>Newroad Area, Newroad</h4>
                <h4>Home Delivery</h4>
                <h4>
                  {product.price > 500
                    ? "Cash on Delivery Not Available"
                    : "Cash on Delivery Available"}
                </h4>
                <div className="returns__wordWrap">
                  <span>Returns & Warranty</span>
                  <Info className="info__icon" />
                </div>
              </div>
              <div className="warranty__info">
                <h4>7 Days Return</h4>
                <h4>Warranty not available</h4>
              </div>
              <div className="sub__totalSection">
                <span>Quantity</span>
                <div className="quantity__selector">
                  <select
                    className="select__productQuantity"
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(e.target.value);
                    }}
                  >
                    {[...Array(product.countInStock).keys()].map((x, i) => {
                      if (i + 1 < 11) {
                        return (
                          <option key={i} value={i + 1}>
                            {i + 1}
                          </option>
                        );
                      }
                    })}
                  </select>
                </div>
                <div className="sub__totalWrapper">
                  <span>Total cost:</span>
                  <h3>${(quantity * product.price).toFixed(2)}</h3>
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
          {localStorage.getItem("user") !== "null" && (
            <AddReview product={product} />
          )}
          <Reviews product={product} key={1} />
        </>
      )}
    </React.Fragment>
  );
}
