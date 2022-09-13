
import React,{useEffect,useState} from 'react'
import '../../css/singleProduct.css'
import{useNavigate} from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel';
import {Button} from 'react-bootstrap'
import axios from 'axios'
import {useDispatch,useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {getProductDetails,newReview,updateLike} from '../../actions/productAction'
import {LIKE_PRODUCT_RESET, NEW_REVIEW_REQUEST, NEW_REVIEW_RESET, PRODUCT_DETAILS_RESET, PRODUCT_DETAILS_SUCCESS} from '../../constants/productConstants'
import ReviewPrpduct from './ReviewPrpduct'
import Metadata from '../layout/Metadata';
import {addItemsToCart} from '../../actions/cartAction'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";

import { useAlert } from 'react-alert'


const ProductDetails = () => {


  const alert = useAlert()
  const product = useSelector((state)=>state.product)
  const {success:successData,error} = useSelector((state) => state.newReview)
  const { name , description , price , actualpricebydiscount,discount,size ,color,loading, images  ,stock ,numOfReviews, reviews,likes} = product

  const{isLiked} = useSelector((state) => state.dealProduct)


const dispatch = useDispatch()
const navigate = useNavigate()
const[quantity,setQuantity] = useState(1)
const [open, setOpen] = useState(false);
const [rating, setRating] = useState();
const [comment, setComment] = useState("");


const[like,setLike] = useState(1)
const {productId}  = useParams()



const quantityIncrease = ()=>{
if(stock<=quantity) return 
const qty = quantity + 1
setQuantity(qty)

}

const quantityDecrease = ()=>{
  if(1>=quantity) return
  const qty = quantity -1
  setQuantity(qty)
}

const increaseLike = (e)=>{
  setLike(like)
  const myForm = new FormData()
  myForm.set("like",like)
  dispatch(updateLike(productId,like))
  alert.success("You Liked the Product")
  setInterval(() => {
    window.location.reload();
  }, 1000);

}




const addToCartHandler = ()=>{
  dispatch(addItemsToCart(productId,quantity))
  alert.success('Item Added Succesfully ')
}

const submitReviewToggle = () => {
  open ? setOpen(false) : setOpen(true);
};

const reviewSubmitHandler = ()=>{
  const myForm = new FormData()
  myForm.set("rating",rating)
  myForm.set("comment",comment)
  myForm.set("productId",productId)
  dispatch(newReview(myForm))
  setOpen(false)
  setInterval(() => {
    window.location.reload();
  }, 1000);
  
}




const fetchProductDetails = async()=>{
   const response = await axios.get(`http://localhost:8000/api/soummya/product/${productId}`).catch((err)=>{
    console.log("data not fetching", err)
  })
  dispatch(getProductDetails(response.data.product))
  
}

useEffect(() => {
  if(productId && productId!=="") fetchProductDetails()

  // dispatch({type:LIKE_PRODUCT_RESET})
}, [productId])


useEffect(() => {
  if(successData){
    alert.success("Review Added succesfully ") 
    // dispatch({type:NEW_REVIEW_RESET})
  }
  
   if(isLiked)
   {
    dispatch({type:LIKE_PRODUCT_RESET})
   }
  // dispatch({type:NEW_REVIEW_RESET})
  // dispatch({type:NEW_REVIEW_REQUEST})

}, [dispatch,successData,isLiked])


  return (
  <>
{/* loading use add load  */}

	<div className="container">
				<div className="row align-items-start mt-5">
					<div className="col-md-6">						
						<div className="preview-pic tab-content">
						  <div className="tab-pane active" id="pic-1">
                <Metadata title={`${product.name}`}/>
                <Carousel>
                
            {

              images && images.map((item,i)=>(
                <Carousel.Item>
                    <img key={item.url} src={item.url} alt={`${i} Slide`}/>
                </Carousel.Item>
              
              ))
            }
           
            </Carousel>
              </div>
						</div>
					</div>
					<div className="col-md-6">
            <div className="details-box">
						<h4>{name}</h4>
						<div className="rating">
							<div className="stars">
              <Rating size="large" value = {product && product?.ratings ? product?.ratings : 3} readOnly="true" precision="0.5"/><span>({numOfReviews} reviews)</span>
							</div>
						  <div>      
              </div>
						</div>
            <div className="description-box">
              <h5 className="description">Description</h5>
            <p>{description}</p>
            </div>	
{
 discount ===0 &&
<h4 className="current-price">current price: <span className="price">{`₹${price}`}</span></h4>
}

{
 discount >0 &&
<div className="">
  <h4 className="current-price">M.R.P: <del><span className="price">{`₹${price.toFixed(1)}`}</span></del></h4>

<div className="d-sm-flex align-items-baseline justify-content-start">
  <div className="">
  <h4 className="current-price">current price: <span className="price">{`₹${actualpricebydiscount.toFixed(1)}`}</span></h4>

  </div>
  <div className="">
  <p className="rate">{discount}% discount</p>
  </div>
</div>
 
 </div>
}

{
  color && <p className="current-price">Color : {color}</p>
}
{
  size && <p className="current-price">Size : {size}</p>
}


            <div className="d-sm-flex mt-3 mb-3">
              <div className="qunty-box">
                  <Button variant="btn-qty" onClick={quantityIncrease}> + </Button>{' '}
                  <input type="number" class="inputtext" readonly value={quantity}/>
                  <Button variant="btn-qty" onClick={quantityDecrease}> - </Button>{' '}
              </div>
              <div className="">
							<button className="btn add-to-cart" type="button" disabled={stock < 1 ? true : false} onClick={addToCartHandler}>add to cart</button>
							</div>
            </div>
            


						<div className="mt-4 mb-4 d-sm-flex align-items-center">
             
              <div className="">              
              <button onClick={(e)=>increaseLike(e.target.value)} className="like btn btn-default " type="button"><span className="fa fa-heart">{likes}</span></button>
              </div>
            </div>



            <div className="d-sm-flex">
               <div className=""><p> Status : </p></div>
                <div className=""> {
              stock < 1 ? <p className="ms-3" style={{color:"red"}}>Out Of stck</p> : 
              <p  className="ms-3" style={{color:"green"}}>In Stock</p>
            }</div>


            </div>
            <button onClick={submitReviewToggle}>Submit Review</button>

            <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
					</div>
              </div>




				</div>

        
	</div>
  <ReviewPrpduct/>
  {/* {reviews && reviews[0] ? (
              <div>
                {
                  reviews && reviews.map((review)=><ReviewPrpduct review={review} />)
                }
              </div>
            ):(
              <p>No reviews there</p>
            )}      */}
  </>
  )
}

export default ProductDetails




