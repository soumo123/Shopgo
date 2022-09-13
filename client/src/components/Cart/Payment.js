import React,{useState,useRef,useEffect} from 'react'
import '../../css/payment.css'
import {useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import CheckoutSteps from './CheckoutSteps'
import { saveShippingInfo } from '../../actions/cartAction'
import {createOrder,getProclearErrors, sendMail} from '../../actions/orderAction'
import Metadata from '../layout/Metadata'
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";


import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
  } from '@stripe/react-stripe-js';
  
  import axios from 'axios'

const Payment = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const orderInfo  = JSON.parse(sessionStorage.getItem("orderInfo"))
  const payBtn = useRef(null)
  const stripe = useStripe()
  const elements = useElements()

  const {shippingInfo,cartItems} = useSelector((state) => state.cart)
  const{user} = useSelector((state) => state.user)

  const to = user?.email
 
  const{error} = useSelector((state) => state.newOrder)

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };


const order = {
  shippingInfo,
  orderItems:cartItems,
  itemsPrice:orderInfo?.subtotal,
  taxPrice:orderInfo?.tax,
  shippingPrice:orderInfo?.shippingCharges,
  totalPrice: orderInfo?.totalPrice


}



  const submitHandler = async(e)=>{
    e.preventDefault()
    payBtn.current.disabled = true

    try {
      const token = localStorage.getItem('token')
      const config = {
        headers: {
            'Content-Type': "application/json",
            // 'Accept':"/"
        },
        withCredentials: true
    }

    const { data } = await axios.post(`http://localhost:8000/api/soummya/payment/process/${token}`, paymentData,config)
    
    const client_secret = data.client_secret;

    if (!stripe || !elements) return;


    const result = await stripe.confirmCardPayment(client_secret, {
      payment_method:{
        card:elements.getElement(CardNumberElement),
        billing_details: {
          name: user?.name,
          email: user?.email,
          address: {
            line1: shippingInfo?.address,
            city: shippingInfo?.city,
            state: shippingInfo?.state,
            postal_code: shippingInfo?.pinCode,
            country: shippingInfo?.country,
          },
        },

      }


    })

    if (result.error) {
      payBtn.current.disabled = false;

      alert(result.error.message);
    }else{
      if (result.paymentIntent.status === "succeeded") {
        order.paymentInfo = {
          id: result.paymentIntent.id,
          status: result.paymentIntent.status,
        };

        dispatch(createOrder(order));
        navigate("/success")
        dispatch(sendMail(to))
      }else{
        alert("There's some issue while processing payment ");
      }
    }
      
    } catch (error) {
      payBtn.current.disabled = true
      alert(error)
    }

  }

  useEffect(() => {
   if(error){
    alert(error.message)
    dispatch(getProclearErrors())
   }
  }, [dispatch,error,alert])
  



  return (
    <>
    <Metadata title="Payment"/>
    <CheckoutSteps activeStep={2}/>

      <div className="container">
        <div className="row mt-5 mb-5 justify-content-center">
           <div className="col-sm-6">
           <form onSubmit={(e)=>submitHandler(e)} className="form">

<div className="form-group">
<label>Card Number</label>
  <CardNumberElement placeholder="Card Number" className="form-control inputtext"/>
</div>
<div className="form-group">
<label>Expiry Date</label>
        <CardExpiryElement className="paymentInput"  className="form-control inputtext"/>
      </div>
      <div className="form-group">
      <label>CVV</label>
        <CardCvcElement className="paymentInput"  className="form-control inputtext"/>
      </div>

      <input type="submit" className="btn add-to-cart"value={`Pay - ₹${orderInfo && orderInfo.totalPrice.toFixed(1)}`} ref={payBtn}/>


</form>
           </div>
        </div>
      </div>


    
   
    
    
    
    </>
  )
}

export default Payment