import React from "react";
import "./product.css";
import { Link } from "react-router-dom";

export default function Product({ product }) {
  return (
    <Link to={`/product/${product._id}`}>
      <div className="product">
        <img src={product.image} alt={product.title} />
        <div className="product__info">
          <p className="product__title">{product.title}</p>
          <div className="product__brand">
            <p className="product__brandName">{product.brand}</p>
            <p className="product__price">${product.price.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
