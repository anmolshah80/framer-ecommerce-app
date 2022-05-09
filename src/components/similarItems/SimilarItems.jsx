import React from "react";
import "./similarItems.css";
import { useSelector } from "react-redux";
import Product from "../../components/product/Product";
import Skeleton from "../skeleton/Skeleton";

export default function SimilarItems({ currentProduct }) {
  const getAllProductsState = useSelector(
    (state) => state.getAllProductsReducer
  );

  const { loading, products, error } = getAllProductsState;

  return (
    <React.Fragment>
      <div className="similar__items">
        <h2 className="similar__itemsWordWrap">Similar Items</h2>

        <div className="similar__productContainer">
          {loading ? (
            <Skeleton
              type="product_card"
              key={products?.map((product) => product._id)}
              renderCount={4}
            />
          ) : error ? (
            <Skeleton
              type="custom_effect"
              message="Something went wrong. Please try again."
            />
          ) : products?.length > 0 ? (
            products
              .filter(
                (product) =>
                  (product.category.match(currentProduct.category) ||
                    product.brand.match(currentProduct.brand)) &&
                  product._id !== currentProduct._id
              )
              .sort()
              .reverse()
              .slice(0, 4)
              .map((product) => {
                return <Product product={product} key={product._id} />;
              })
          ) : (
            <h1>No product found!</h1>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
