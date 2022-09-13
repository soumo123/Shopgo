import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import CheckoutSteps from './CheckoutSteps'
import { saveShippingInfo } from '../../actions/cartAction'
import Metadata from '../layout/Metadata'
import { createOrder,sendMail } from '../../actions/orderAction'

const ConfirmOrder = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { cartItems, shippingInfo } = useSelector((state) => state.cart)

  console.log("cartItemssss",cartItems)
  const { user } = useSelector((state) => state.user)


const subtotal = cartItems.reduce((acc,item)=>acc + item.quantity * item.price,0)


const shippingCharges = subtotal > 500 ? 50 : 0

const tax = 10
const totalPrice = subtotal + shippingCharges + tax

const address = `${shippingInfo.address},${shippingInfo.city},${shippingInfo.state}${shippingInfo.pinCode},${shippingInfo.country}`


const proceedToPayment = ()=>{

const data = {
  subtotal,
  shippingCharges,
  tax,
  totalPrice

}


sessionStorage.setItem("orderInfo",JSON.stringify(data));
navigate("/process/payment")
}
const to = user?.email
const orderInfo  = JSON.parse(sessionStorage.getItem("orderInfo"))
const order = {
  shippingInfo,
  orderItems:cartItems,
  itemsPrice:subtotal,
  taxPrice:tax,
  shippingPrice:shippingCharges,
  totalPrice: totalPrice,
  paymentInfo:{
    id:user._id,
    status:"Processing"
  }

}


const codPayement = (e)=>{
  e.preventDefault();
  dispatch(createOrder(order));
  navigate("/success")
  dispatch(sendMail(to))
}





  return (
    <>
      <Metadata title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
<div className="container">
  <div className="row mt-5">
      <div className="col-sm-9">
         <div className="row">
         <div className="col-sm-3">

<div>
        <h5 className="online">Your Cart Items</h5>

        {
          cartItems && cartItems.map((item) => (
            <div className="product-imgs text-center">
            <div className="online-img" key={item.product}>
              <img src={item.image} />                           
            </div>
            <p><Link to={`/product/${item.product}`}>{item.name}</Link> </p>
            </div>

          ))}

      </div>

</div>
<div className="col-sm-3 offset-sm-3">
<div className="namebox">
        <h5 className="online">Order Summary</h5>
        <div  className="mt-4">

<p>Name : {user.name}</p>
<p>Phone : +91 {shippingInfo.phoneNo}</p>
<p>Address : {address}</p>

</div>

{
          cartItems && cartItems.map((item) => (
            <div key={item.product}>

      
              <span>

                
                <b>{item.quantity} x ₹ {item.price} = ₹{(item.quantity * item.price).toFixed(1)}</b>
              </span>
            </div>

          ))}      

      </div>
</div>
         </div>
      </div>

      <div className="col-sm-3">
        <div className="cart-box text-center">
      <p>Subtotal : ₹{subtotal}</p>
        <p>Shipping Charges : ₹{shippingCharges}</p>
        <p>GST : ₹{tax.toFixed(1)}</p>
<p>Total :₹ {totalPrice.toFixed(1)}</p>
{/* <button onClick={proceedToPayment} className="btn add-to-cart mb-2">Proceed To payment</button> */}
<button onClick={codPayement} className="btn add-to-cart mb-2" >COD Payment </button>

      </div>
      </div>




  </div>
</div>





     

      



    </>
  )
}

export default ConfirmOrder