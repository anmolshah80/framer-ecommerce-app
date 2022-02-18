import React from "react";
import "./reviews.css";
import Rating from "@mui/material/Rating";
import { Bookmark, Delete } from "@mui/icons-material";

export default function Reviews({ product }) {
  // for review delete button
  //   const currentUser = JSON.parse(localStorage.getItem("user"));

  const formatRating = (rating) => {
    return `${Number(rating).toFixed(1)}`;
  };

  return (
    <div className="reviews">
      <div className="customer__reviewContainer">
        <h2 className="customer__reviewsText">Customer reviews</h2>
        <div className="ratings__info">
          {/* <Rating
          className="customer__rating"
          name="simple-controlled"
          value={value}
          size="large"
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        /> */}
          <Rating
            className="customer__rating"
            name="half-rating-read"
            defaultValue={product.rating}
            precision={0.5}
            size="large"
            readOnly
          />
          <span className="ratings__customer">
            {formatRating(product.rating)} out of 5
          </span>
        </div>
        <span className="total__reviews">
          {product.reviews?.length} reviews
        </span>
        <div className="progress__bar">
          <div className="progress__barOneWrapper">
            <span className="progress_barStar">5 Star</span>
            <div className="progress__barOne"></div>
            <span className="progress__barStats">100%</span>
          </div>
          <div className="progress__barTwoWrapper">
            <span className="progress_barStar">4 Star</span>
            <div className="progress__barTwo"></div>
            <span className="progress__barStats">0%</span>
          </div>
          <div className="progress__barThreeWrapper">
            <span className="progress_barStar">3 Star</span>
            <div className="progress__barThree"></div>
            <span className="progress__barStats">80%</span>
          </div>
          <div className="progress__barFourWrapper">
            <span className="progress_barStar">2 Star</span>
            <div className="progress__barFour"></div>
            <span className="progress__barStats">20%</span>
          </div>
          <div className="progress__barFiveWrapper">
            <span className="progress_barStar">1 Star</span>
            <div className="progress__barFive"></div>
            <span className="progress__barStats">0%</span>
          </div>
        </div>
      </div>

      <div className="reviews__container">
        <h3 className="review__wordWrap">All reviews and ratings</h3>
        {product.reviews?.map((review) => {
          <>
            <div className="user__ratings">
              <h4 className="review__username">{review.username}</h4>
              <Rating
                className="rating__username"
                name="half-rating-read"
                defaultValue={review.rating}
                precision={0.5}
                readOnly
              />
            </div>
            <div className="review__dateContainer">
              <span className="review__date">Reviewed on May 4, 2021</span>
              <div className="verified__badge">
                <Bookmark className="verified__icon" />
                <span className="verified__purchaseText">
                  Verified purchase
                </span>
              </div>
            </div>
            <p className="user__reviews">{review.review}</p>
            <div className="review__deleteContainer">
              <Delete className="delete__icon" />
              <span className="review__delete">Delete</span>
            </div>
          </>;
        })}
      </div>
    </div>
  );
}
