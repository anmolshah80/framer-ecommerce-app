import React from "react";
import "./addReview.css";
import Rating from "@mui/material/Rating";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductReview } from "../../actions/productActions";
import { WarningAmber } from "@mui/icons-material";

export default function AddReview({ product }) {
  const [ratingValue, setRatingValue] = useState(0);
  const [userReview, setUserReview] = useState("");
  const [isRatingZero, setIsRatingZero] = useState(false);

  const dispatch = useDispatch();

  const sendProductReview = (e) => {
    if (ratingValue < 1) {
      e.preventDefault();
      setIsRatingZero(true);
    } else {
      const currentUser = JSON.parse(localStorage.getItem("user"));

      let alreadyReviewed;

      // check if the current logged-in user has already reviewed this product once
      for (let i = 0; i < product.reviews.length; i++) {
        if (product.reviews[i].userid == currentUser._id) {
          alreadyReviewed = true;
        }
      }

      if (alreadyReviewed) {
        alert("You have already reviewed this product");
      } else {
        const review = {
          ratingValue: ratingValue,
          userReview: userReview,
        };

        dispatch(addProductReview(review, product._id));
      }
    }
  };

  return (
    <div className="add__review">
      <h2 className="add__reviewWordWrap">Add your review</h2>
      <form onSubmit={sendProductReview}>
        <div className="user__ratingsContainer">
          <span className="user__ratingsWordWrap">Rate the product: </span>
          <Rating
            className="add__ratings"
            name="half-rating"
            value={ratingValue}
            precision={0.5}
            size="large"
            onChange={(event, newValue) => {
              setRatingValue(newValue);
            }}
          />
        </div>
        {isRatingZero && (
          <span className="rating__requireWarning">
            <WarningAmber className="rating__WarningIcon" /> Rating is required
          </span>
        )}
        <div className="review__textSection">
          <span className="limit__textLength">Max. 400 characters</span>
          <textarea
            id="story"
            name="story"
            rows="4"
            cols="10"
            className="product__reviewUser"
            placeholder="Add a review..."
            minLength={10}
            maxLength={400}
            value={userReview}
            onChange={(e) => {
              setUserReview(e.target.value);
            }}
            spellCheck
          ></textarea>
        </div>
        <div className="submit__buttonWrapper">
          <button className="submit__reviewButton" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
