import React from "react";
import "./skeleton.css";
import { CircularProgress } from "@mui/material";

export default function Skeleton({ type, message, renderCount }) {
  const counter = 6;

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

  // topbar skeleton loading css locally available in Topbar component
  const TopbarSkeleton = () => (
    <div className="topbar__skeleton">
      <div className="topbar__skeletonIcons"></div>
      <div className="avatar__skeletonIcon"></div>
      <div className="topbar__skeletonIcons"></div>
    </div>
  );

  const CircularProgressEffect = () => (
    <div className="circular__loadingEffect">
      <CircularProgress />
    </div>
  );

  // custom loading CSS effect
  const CustomLoadingEffect = () => (
    <div className="custom">
      <div className="balls">
        <div className="ball ball1"></div>
        <div className="ball ball2"></div>
        <div className="ball ball3"></div>
      </div>
      <span className="custom__text">{message}</span>
    </div>
  );

  if (type === "product_card")
    return Array(renderCount ? renderCount : counter).fill(
      <ProductCardSkeleton />
    );

  if (type === "topbar") return <TopbarSkeleton />;

  if (type === "circular_effect") return <CircularProgressEffect />;

  if (type === "custom_effect") return <CustomLoadingEffect />;
}
