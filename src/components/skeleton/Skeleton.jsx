import React from "react";
import "./skeleton.css";

export default function Skeleton({ type }) {
  const counter = 8;

  const ProductCardSkeleton = () => (
    <div className="card__skeletonWrapper">
      <div className="card__skeleton">
        <div className="image__skeleton"></div>
        <div className="product__infoWrapper">
          <div className="title__skeleton"></div>
          <div className="product__infoSkeleton">
            <div className="brand__skeleton"></div>
            <div className="price__skeleton"></div>
          </div>
        </div>
      </div>
    </div>
  );

  if (type === "product_card")
    return Array(counter).fill(<ProductCardSkeleton />);
}
