import React from "react";
import "./deleteReview.css";
import { Delete } from "@mui/icons-material";
import { deleteProductReview } from "../../actions/productActions";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../actions/productActions";
import Skeleton from "../../components/skeleton/Skeleton";

export default function DeleteReview() {
  const dispatch = useDispatch();

  const params = useParams();

  const currentUserState = useSelector((state) => state.loginUserReducer);

  const { currentUser } = currentUserState;

  const getProductByIdState = useSelector(
    (state) => state.getProductByIdReducer
  );

  const { product, loading, error } = getProductByIdState;

  useEffect(() => {
    dispatch(getProductById(params.productId));
  }, []);

  const navigate = useNavigate();

  const handleDelete = () => {
    dispatch(deleteProductReview(params.productId, currentUser._id));
    alert("Your product review was deleted successfully");
    navigate(`/product/${params.productId}`);
  };

  return (
    <div className="deleteProduct__modal">
      <div className="deleteProduct__modalContainer">
        <span className="delete__buttonContainer">
          <Delete className="delete__buttonModal" />
        </span>
        <h3 className="delete__confirmationMessage">
          Are you sure you want to delete your review for the product title "
          {loading ? (
            <Skeleton type="custom_effect" />
          ) : error ? (
            error
          ) : (
            product && product.title
          )}
          "?
        </h3>
        <div className="delete__actionsContainer">
          <Link to="/products">
            <button className="delete__actionCancel">Cancel</button>
          </Link>
          <button className="delete__actionDelete" onClick={handleDelete}>
            Delete Review
          </button>
        </div>
      </div>
    </div>
  );
}
