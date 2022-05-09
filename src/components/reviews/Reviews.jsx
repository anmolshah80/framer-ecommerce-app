import React from "react";
import "./reviews.css";
import Rating from "@mui/material/Rating";
import { Bookmark, Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Reviews({ product }) {
  // allow the logged-in users to delete their reviews only
  const currentUserState = useSelector((state) => state.loginUserReducer);

  const { currentUser } = currentUserState;

  const formatRating = (rating) => {
    return `${Number(rating).toFixed(1)}`;
  };

  const formatPercentage = (percentage) => {
    if (Number(percentage) % 1 != 0) {
      return `${Number(percentage).toFixed(1)}`;
    } else {
      return percentage;
    }
  };

  const formatReviewDate = (date) => {
    const slicedDate = date.slice(0, 10).toString();

    let formattedDate = new Date(slicedDate);
    formattedDate = formattedDate.toString();
    formattedDate =
      formattedDate.substring(4, 10) + "," + formattedDate.substring(10, 15);
    return `${formattedDate}`;
  };

  // compute the width of rating bar based on the number and type of ratings
  let barOneLeftWidth = 0;
  let barOneRightWidth = 260;
  let barTwoLeftWidth = 0;
  let barTwoRightWidth = 260;
  let barThreeLeftWidth = 0;
  let barThreeRightWidth = 260;
  let barFourLeftWidth = 0;
  let barFourRightWidth = 260;
  let barFiveLeftWidth = 0;
  let barFiveRightWidth = 260;

  let barOnePercentage = 0;
  let barTwoPercentage = 0;
  let barThreePercentage = 0;
  let barFourPercentage = 0;
  let barFivePercentage = 0;

  const computeRatingBar = () => {
    let isFiveStar = 0;
    let isFourStar = 0;
    let isThreeStar = 0;
    let isTwoStar = 0;
    let isOneStar = 0;

    product.reviews?.map((review) => {
      let roundedRating = Math.round(review.rating);
      roundedRating == 1
        ? (isOneStar += 1)
        : roundedRating == 2
        ? (isTwoStar += 1)
        : roundedRating == 3
        ? (isThreeStar += 1)
        : roundedRating == 4
        ? (isFourStar += 1)
        : (isFiveStar += 1);

      console.log(
        "Rounded Rating: ",
        isFiveStar,
        isFourStar,
        isThreeStar,
        isTwoStar,
        isOneStar
      );

      if (isOneStar != 0) {
        barOneLeftWidth = 260 / isOneStar;
        barOneRightWidth = 260 - barOneLeftWidth;
        barOnePercentage = (1 / isOneStar) * 100;
      }

      if (isTwoStar != 0) {
        barTwoLeftWidth = 260 / isTwoStar;
        barTwoRightWidth = 260 - barTwoLeftWidth;
        barTwoPercentage = (1 / isTwoStar) * 100;
      }

      if (isThreeStar != 0) {
        barThreeLeftWidth = 260 / isThreeStar;
        barThreeRightWidth = 260 - barThreeLeftWidth;
        barThreePercentage = (1 / isThreeStar) * 100;
      }

      if (isFourStar != 0) {
        barFourLeftWidth = 260 / isFourStar;
        barFourRightWidth = 260 - barFourLeftWidth;
        barFourPercentage = (1 / isFourStar) * 100;
      }

      if (isFiveStar != 0) {
        barFiveLeftWidth = 260 / isFiveStar;
        barFiveRightWidth = 260 - barFiveLeftWidth;
        barFivePercentage = (1 / isFiveStar) * 100;
      }
    });
  };

  computeRatingBar();

  console.log("product: ", product.reviews);

  return (
    <div className="reviews">
      <div className="customer__reviewContainer">
        <h2 className="customer__reviewsText">Customer reviews</h2>
        <div className="ratings__info">
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
            <div className="progress__barOne">
              <div className="left" style={{ width: barFiveLeftWidth }}></div>
              <div className="right" style={{ width: barFiveRightWidth }}></div>
            </div>
            <span className="progress__barStats">
              {formatPercentage(barFivePercentage)}%
            </span>
          </div>
          <div className="progress__barTwoWrapper">
            <span className="progress_barStar">4 Star</span>
            <div className="progress__barTwo">
              <div className="left" style={{ width: barFourLeftWidth }}></div>
              <div className="right" style={{ width: barFourRightWidth }}></div>
            </div>
            <span className="progress__barStats">
              {formatPercentage(barFourPercentage)}%
            </span>
          </div>
          <div className="progress__barThreeWrapper">
            <span className="progress_barStar">3 Star</span>
            <div className="progress__barThree">
              <div className="left" style={{ width: barThreeLeftWidth }}></div>
              <div
                className="right"
                style={{ width: barThreeRightWidth }}
              ></div>
            </div>
            <span className="progress__barStats">
              {formatPercentage(barThreePercentage)}%
            </span>
          </div>
          <div className="progress__barFourWrapper">
            <span className="progress_barStar">2 Star</span>
            <div className="progress__barFour">
              <div className="left" style={{ width: barTwoLeftWidth }}></div>
              <div className="right" style={{ width: barTwoRightWidth }}></div>
            </div>
            <span className="progress__barStats">
              {formatPercentage(barTwoPercentage)}%
            </span>
          </div>
          <div className="progress__barFiveWrapper">
            <span className="progress_barStar">1 Star</span>
            <div className="progress__barFive">
              <div className="left" style={{ width: barOneLeftWidth }}></div>
              <div className="right" style={{ width: barOneRightWidth }}></div>
            </div>
            <span className="progress__barStats">
              {formatPercentage(barOnePercentage)}%
            </span>
          </div>
        </div>
      </div>
      <div className="reviews__container">
        <h3 className="review__wordWrap">All reviews and ratings</h3>

        {product.reviews?.length > 0 ? (
          product.reviews?.map((review, index) => {
            return (
              <React.Fragment>
                {review.review != "" && (
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
                      <span className="review__date">
                        Reviewed on {formatReviewDate(review.createdAt)}
                      </span>

                      <div className="verified__badge">
                        <Bookmark className="verified__icon" />
                        <span className="verified__purchaseText">
                          Verified purchase
                        </span>
                      </div>
                    </div>
                    <p className="user__reviews" key={index}>
                      {review.review}
                    </p>

                    {currentUser !== null && currentUser._id == review.userid && (
                      <Link to={`/delete-review/${product._id}`}>
                        <div className="review__deleteContainer">
                          <Delete className="delete__icon" />
                          <span className="review__delete">Delete</span>
                        </div>
                      </Link>
                    )}
                  </>
                )}
              </React.Fragment>
            );
          })
        ) : (
          <h3 style={{ fontWeight: "500", marginTop: "20px" }}>
            No reviews yet. Be the first to add a review.
          </h3>
        )}
      </div>
    </div>
  );
}
