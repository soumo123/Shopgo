import React, {useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
    getAllReviews,
  deleteReviews,
  getProclearErrors
} from "../../actions/productAction";
import {useNavigate} from 'react-router-dom'
import { Button } from "@material-ui/core";
import MetaData from "../../components/layout/Metadata";
import DeleteIcon from "@material-ui/icons/Delete";
import Star from "@material-ui/icons/Star";
import { useAlert } from 'react-alert'
import SideBar from "./Sidebar";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";

import '../../css/dashboardreview.css'

const ProductReviews = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const alert = useAlert()
  
    const { error, isDeleted } = useSelector(
      (state) => state.review
    );

  
    const { reviews, loading } = useSelector(
      (state) => state.productReviews
    );
  
    const [productId, setProductId] = useState("");
  
    const deleteReviewHandler = (reviewId) => {
      dispatch(deleteReviews(reviewId, productId));
    };
  

    const productReviewsSubmitHandler = (e) => {
      e.preventDefault();
      dispatch(getAllReviews(productId));
    };
  
    useEffect(() => {
      if (productId.length === 24) {
        dispatch(getAllReviews(productId));
      }
      if (error) {
        alert.error("Ooops..Review not deleted");
        dispatch({ type: DELETE_REVIEW_RESET });
      }
  
      if (isDeleted) {
        alert.success("Review Deleted Successfully");
        navigate("/admin/reviews");
        dispatch({ type: DELETE_REVIEW_RESET });
      }
    }, [dispatch, alert, error,navigate,alert, isDeleted, productId]);
  
    const columns = [
      { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },
  
      {
        field: "user",
        headerName: "User",
        minWidth: 200,
        flex: 0.6,
      },
  
      {
        field: "comment",
        headerName: "Comment",
        minWidth: 350,
        flex: 1,
      },
  
      {
        field: "rating",
        headerName: "Rating",
        type: "number",
        minWidth: 180,
        flex: 0.4,
  
        cellClassName: (params) => {
          return params.getValue(params.id, "rating") >= 3
            ? "greenColor"
            : "redColor";
        },
      },
  
      {
        field: "actions",
        flex: 0.3,
        headerName: "Actions",
        minWidth: 150,
        type: "number",
        sortable: false,
        renderCell: (params) => {
          return (
            <>
              <Button
                onClick={() =>
                  deleteReviewHandler(params.getValue(params.id, "id"))
                }
              >
                <DeleteIcon />
              </Button>
            </>
          );
        },
      },
    ];
  
    const rows = [];
  
    reviews &&
      reviews.forEach((item) => {
        rows.push({
          id: item._id,
          rating: item.rating,
          comment: item.comment,
          user: item.name,
        });
      });
  











  return (
   <>
   
   <MetaData title={`ALL REVIEWS - Admin`} />
   <div className="container-fluid display-table">
      <div className="row display-table-row">
        <SideBar/>
      <div className="dashboard">
        {/* <SideBar /> */}
        <div className="container">
           <div className="row">
             <div className="col-sm-6">
             <div className="productReviewsbox">
        <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>
          <form
            className="productReviewsForm d-sm-flex align-items-end justify-content-between"
            onSubmit={productReviewsSubmitHandler}
          >
           

            <div class="form-group">
             <label for="">Product ID</label>
              <input
                type="text"
                placeholder="Product Id" class="form-control inputtext"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>
            <div class="form-group">
            <button
              id="" 
              type="submit" classname="btn add-to-cart"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Search
            </button>
            </div>
          </form>

      
        </div>
             </div>
           </div>
           <div className="row">
             <div className="col-sm-12">
             {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          ) : (
            <p className="not-found">No Reviews Found</p>
          )}
             </div>
           </div>
        </div>
       
      </div>
      </div>
      </div>
   </>
  )
}

export default ProductReviews