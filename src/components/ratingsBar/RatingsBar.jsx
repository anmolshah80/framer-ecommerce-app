import React from "react";
import "./ratingsBar.css";

export default function RatingsBar() {
  return (
    <div className="ratings__bar">
      <div className="star__widget">
        <input type="radio" name="rate" id="rate-5" />
        <label for="rate-5" class="fas fa-star"></label>
        <input type="radio" name="rate" id="rate-4" />
        <label for="rate-4" class="fas fa-star"></label>
        <input type="radio" name="rate" id="rate-3" />
        <label for="rate-3" class="fas fa-star"></label>
        <input type="radio" name="rate" id="rate-2" />
        <label for="rate-2" class="fas fa-star"></label>
        <input type="radio" name="rate" id="rate-1" />
        <label for="rate-1" class="fas fa-star"></label>
      </div>
    </div>
  );
}
