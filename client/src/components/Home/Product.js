import React,{useEffect,useState} from 'react'
import './home.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import ReactStars from "react-rating-stars-component";
import { Rating } from "@material-ui/lab";



const Product = ({ product }) => {


  
  const options = {
    size: "large",
    value: product?.ratings,
    readOnly: true,
    precision: 0.5

  }



 
  return (
    <>
    

      <div className="col-sm-6 col-lg-3">
        <div className="productcard">
          <Link className="" to={`/product/${product._id}`}>
            <div className="product-img">
              <img src={product.images[0].url} style={{ height: 200 }} />
            </div>

            <div className="details-box">
              <h4>{product.name}</h4>
              <div className="rating d-sm-flex justify-content-around">
                <Rating {...options} /><span className="review">{product.numOfReviews} reviews</span>
              </div>
              <span className="price">{`₹${product.price}`}</span>
            </div>

          </Link>
        </div>
      </div>
    </>
  )
}

export default Product