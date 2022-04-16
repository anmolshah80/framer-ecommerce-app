import React from "react";
import "./orders.css";
import Topbar from "../../components/topbar/Topbar";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getOrdersByUserID } from "../../actions/orderActions";
import Skeleton from "../../components/skeleton/Skeleton";

export default function Orders() {
  const columns = [
    { id: "_id", label: "Order ID", minWidth: 140, align: "center" },
    {
      id: "orderAmount",
      label: "Amount",
      minWidth: 120,
      format: (value) => value.toFixed(2),
      align: "center",
    },
    {
      id: "createdAt",
      label: "Date",
      minWidth: 120,
      format: (value) => value.substring(0, 10),
      align: "center",
    },
    {
      id: "transactionID",
      label: "Transaction ID",
      minWidth: 140,
      align: "center",
    },
    {
      id: "orderStatus",
      label: "Order Status",
      minWidth: 160,
      align: "center",
    },
  ];

  const Button = ({ type }) => {
    return <button className={"status " + type}>{type}</button>;
  };

  const orderState = useSelector((state) => state.getOrdersByUserIDReducer);

  const { orders, error, loading } = orderState;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch(getOrdersByUserID());
    } else {
      navigate("/login");
    }
  }, [dispatch]);

  // const handleOrderDetails = (order_id) => {
  //   navigate(`/order-details/${order_id}`);
  // };

  return (
    <React.Fragment>
      <Topbar />
      <div className="orders">
        <h1 className="heading__wrapper">Find your order</h1>
        {error && (
          <Skeleton
            type="custom_effect"
            message="Something went wrong. Please try again later."
          />
        )}
        {loading ? (
          <Skeleton type="circular_effect" />
        ) : (
          <Paper className="paper__container">
            <TableContainer
              className="table__container"
              sx={{ maxHeight: 440 }}
            >
              <Table stickyHeader aria-label="sticky table">
                <TableHead className="table__head">
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {orders &&
                    orders.map((order, index) => {
                      return (
                        // <Link to="/order-details:order_id">
                        <TableRow
                          className="table__row"
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          onClick={() =>
                            navigate(`/order-details/${order["_id"]}`)
                          }
                          key={order._id}
                        >
                          {columns.slice(0, 4).map((column) => {
                            return (
                              <TableCell
                                align={column.align}
                                key={order[column.id]}
                              >
                                {column.format
                                  ? column.format(order[column.id])
                                  : order[column.id]}
                              </TableCell>
                            );
                          })}

                          <TableCell align="center" key={index}>
                            {order.orderStatus === "delivered" ? (
                              <Button type="Delivered" />
                            ) : order.orderStatus === "processing" ? (
                              <Button type="Processing" />
                            ) : (
                              <Button type="Canceled" />
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
      </div>
    </React.Fragment>
  );
}
