import React from "react";
import "./orderDetails.css";
import Topbar from "../../components/topbar/Topbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderDescByID } from "../../actions/orderActions";
import Skeleton from "../../components/skeleton/Skeleton";

export default function Orders() {
  const dispatch = useDispatch();

  const orderID = useParams();

  const orderState = useSelector((state) => state.getOrderDescByIDReducer);

  const { order_desc, loading, error } = orderState;

  useEffect(() => {
    dispatch(getOrderDescByID(orderID.order_id));
  }, [dispatch]);

  function formatPrice(num) {
    return `${Number(num).toFixed(2)}`;
  }

  function formatDate(date) {
    return `${date.substring(0, 10)}`;
  }

  const Button = ({ type }) => {
    return <button className={"status " + type}>{type}</button>;
  };

  return (
    <React.Fragment>
      <Topbar />
      <div className="orders">
        <h1 className="heading__wrapper">Details of your order</h1>
        {error && (
          <Skeleton
            type="custom_effect"
            message="Something went wrong. Could not fetch order description for the requested order."
          />
        )}
        {loading && <Skeleton type="circular_effect" />}
        {order_desc && (
          <React.Fragment>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 700 }}
                aria-label="spanning table"
                className="products__table"
              >
                <TableHead>
                  <TableRow className="table__headingWrapper">
                    <TableCell
                      className="heading__wordWrap"
                      align="center"
                      colSpan={2}
                    >
                      Product Details
                    </TableCell>
                    <TableCell
                      className="heading__wordWrap"
                      align="right"
                      colSpan={2}
                    >
                      Price
                    </TableCell>
                  </TableRow>
                  <TableRow className="table__headingWrapper table__mainRowWrapper">
                    <TableCell className="column__wordWrap">Items</TableCell>
                    <TableCell className="column__wordWrap" align="center">
                      Qty.
                    </TableCell>
                    <TableCell className="column__wordWrap" align="right">
                      Unit ($)
                    </TableCell>
                    <TableCell className="column__wordWrap" align="right">
                      Total Sum ($)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order_desc.orderItems.map((orderItem) => (
                    <TableRow
                      key={orderItem._id}
                      className="table__headingWrapper"
                    >
                      <TableCell className="column__dataWrap">
                        {orderItem.title}
                      </TableCell>
                      <TableCell className="column__dataWrap" align="center">
                        {orderItem.quantity}
                      </TableCell>
                      <TableCell className="column__dataWrap" align="right">
                        {formatPrice(orderItem.price)}
                      </TableCell>
                      <TableCell className="column__dataWrap" align="right">
                        {formatPrice(orderItem.quantity * orderItem.price)}
                      </TableCell>
                    </TableRow>
                  ))}

                  <TableRow className="table__headingWrapper">
                    <TableCell rowSpan={3} />
                    <TableCell className="subtotal__wordWrap" colSpan={2}>
                      Subtotal
                    </TableCell>
                    <TableCell align="right" className="sub__totalCell">
                      ${formatPrice(order_desc.orderAmount)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <div className="order__descriptionContainer">
              <div className="order__descriptionSubContainer">
                <div className="order__description">
                  <h2 className="order__descriptionHeader">
                    Order Description
                  </h2>
                  <div className="order__id">
                    <span className="order__idHeader">OrderID:</span>
                    <span className="order__idData">{order_desc._id}</span>
                  </div>
                  <div className="total__amount">
                    <span className="order__amountHeader">Total amount:</span>
                    <span className="order__amountData">
                      ${formatPrice(order_desc.orderAmount)}
                    </span>
                  </div>
                  <div className="order__date">
                    <span className="order__dateHeader">Order date:</span>
                    <span className="order__dateData">
                      {formatDate(order_desc.createdAt)}
                    </span>
                  </div>
                  <div className="transaction__id">
                    <span className="order__transactionHeader">
                      TransactionID:
                    </span>
                    <span className="order__transactionData">
                      {order_desc.transactionID}
                    </span>
                  </div>
                  <div className="order__status">
                    <span className="order__statusHeader">Order Status:</span>
                    <span className="order__statusData">
                      {order_desc.isDelivered === true ? (
                        <Button type="Delivered" />
                      ) : (
                        <Button type="Processing" />
                      )}
                    </span>
                  </div>
                </div>
                <div className="shipping__details">
                  <h2 className="shipping__detailsHeader">Shipping Details</h2>
                  <div className="shipping__email">
                    <span className="shipping__emailHeader">
                      Email address:
                    </span>
                    <span className="shipping__emailData">
                      {order_desc.email}
                    </span>
                  </div>
                  <div className="shipping__address">
                    <span className="shipping__addressHeader">Address:</span>
                    <span className="shipping__addressData">
                      {order_desc.shippingAddress.address}
                    </span>
                  </div>
                  <div className="shipping__city">
                    <span className="shipping__cityHeader">City:</span>
                    <span className="shipping__cityData">
                      {order_desc.shippingAddress.city}
                      {", "}
                      {order_desc.shippingAddress.country}
                    </span>
                  </div>
                  <div className="shipping__postalCode">
                    <span className="shipping__postalHeader">Postal Code:</span>
                    <span className="shipping__postalData">
                      {order_desc.shippingAddress.postalCode}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
}
