import React from "react";
import "./product.css";
import { Link } from "react-router-dom";

export default function Product({ product }) {
  return (
    <Link to={`/product/${product.id}`}>
      <div className="product">
        <img src={product.image} alt="product shots" />
        <div className="product__info">
          <p className="product__title">{product.title}</p>
          <div className="product__brand">
            <p className="product__brandName">{product.brand}</p>
            <p className="product__price">{product.price}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
