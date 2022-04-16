import React from "react";
// import axios from "axios";
import { useEffect, useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import Product from "../../components/product/Product";
import SidePanel from "../../components/sidePanel/SidePanel";
// import StaticData from "../../StaticData";
import { useDispatch, useSelector } from "react-redux";
import "./home.css";
import { getAllProducts } from "../../actions/productActions";
import Skeleton from "../../components/skeleton/Skeleton";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function Home() {
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 6;
  const startIndex = (currentPage - 1) * productsPerPage;

  const getAllProductsState = useSelector(
    (state) => state.getAllProductsReducer
  );

  const { loading, products, error } = getAllProductsState;

  const selectedProducts = products?.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const totalPages = Math.ceil(products?.length / productsPerPage);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const handleClick = (pageNum) => {
    setCurrentPage(pageNum);
  };

  return (
    <React.Fragment>
      <Topbar loading={loading} />
      <div className="home">
        <SidePanel className="side__panel" />
        <div className="product__containerWrapper product__container">
          {/* <div className="product__container">
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
          </div> */}

          {loading ? (
            <Skeleton
              type="product_card"
              key={products?.map((product) => product._id)}
            />
          ) : error ? (
            <Skeleton
              type="custom_effect"
              message="Something went wrong. Please try again."
            />
          ) : (
            selectedProducts?.map((product) => {
              return <Product product={product} key={product._id} />;
            })
          )}
          {products?.length > 6 && (
            <Stack spacing={2} className="pagination__stack">
              <Pagination
                count={totalPages}
                shape="rounded"
                className="pagination__liElements"
                onChange={(e, page) => handleClick(page)}
              />
            </Stack>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
