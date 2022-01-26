import React from "react";
// import axios from "axios";
import { useEffect } from "react";
import Topbar from "../../components/topbar/Topbar";
import Product from "../../components/product/Product";
import SidePanel from "../../components/sidePanel/SidePanel";
// import StaticData from "../../StaticData";
import { useDispatch, useSelector } from "react-redux";
import "./home.css";
import { getAllProducts } from "../../actions/productActions";

function Home() {
  const getAllProductsState = useSelector(
    (state) => state.getAllProductsReducer
  );

  const { loading, products, error } = getAllProductsState;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <React.Fragment>
      <Topbar />
      <div className="home">
        <SidePanel className="side__panel" />
        <div className="product__containerWrapper">
          {/* <div className="product__container">
            {StaticData.slice(0, 3).map((product) => {
              return <Product product={product} key={product.id} />;
            })}
          </div>

          <div className="product__container">
            {StaticData.slice(3, 6).map((product) => {
              return <Product product={product} key={product.id} />;
            })}
          </div> */}

          {/* <div className="product__container">
            {products.length &&
              products.slice(0, 3).map((product) => {
                return <Product product={product} key={product._id} />;
              })}
          </div> */}

          {/* <div className="product__container">
            {products.length &&
              products.slice(3, 6).map((product) => {
                return <Product product={product} key={product._id} />;
              })}
          </div> */}

          <div className="product__container">
            {loading ? (
              <h1>Loading...</h1>
            ) : error ? (
              <h1>Something went wrong. Please try again.</h1>
            ) : (
              products.slice(0, 3).map((product) => {
                return <Product product={product} key={product._id} />;
              })
            )}
          </div>

          <div className="product__container">
            {loading ? (
              <h1>Loading...</h1>
            ) : error ? (
              <h1>Something went wrong. Please try again.</h1>
            ) : (
              products.slice(3, 6).map((product) => {
                return <Product product={product} key={product._id} />;
              })
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
