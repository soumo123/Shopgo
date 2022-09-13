import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getProclearErrors, getOrderDetails } from "../../actions/orderAction";
import Loader from "../layout/loader/Loader";
import { Link, useParams } from "react-router-dom";
import Metadata from '../layout/Metadata'
import DispatchDetails from './DispatchDetails';

const OrderDetails = () => {
    const dispatch = useDispatch()
    const paramsId = useParams()
    const { order, error, loading } = useSelector((state) => state.orderDetails);



    useEffect(() => {
        if (error) {
            alert(error)
            dispatch(getProclearErrors())
        }
        dispatch(getOrderDetails(paramsId.id))
    }, [dispatch, error, alert, paramsId.id])



    return (
        <>
            {
                loading ? <Loader /> :
                    <>
        <DispatchDetails/>
                        <Metadata title="Order Details" />
                        <div className="container">

                            <div className="row mt-5 mb-5 justify-content-center">
                                <div className="col-sm-3">                                 
<ul className ="detail-image">
{order.orderItems &&
                  order.orderItems.map((item) => (
                  
                   
                      
                          <li>
                            <Link to={`/product/${item.product}`}>
                      <div  key={item.product}>
                      <img className="img-fluid"src={item.image} alt="Product" />
                      </div>
                      </Link>
                    </li>
                     
                     
                    
                  ))}
</ul>
                    
                                </div>

                                <div className="col-sm-5">
                                <div className="order-details">
                                <h4 className="mb-4">Order Items</h4>  
                                <p>Shipping Info</p>
                                <p>Name : <span>{order.user && order.user.name}</span></p>
                                <p>Phone : <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span></p> 
                             <p>Address : <span>{order.shippingInfo && `${order.shippingInfo.address},${order.shippingInfo.city},${order.shippingInfo.state}${order.shippingInfo.pinCode},${order.shippingInfo.country}`}</span></p>



                              {
                                 order?.orderItems?.map((item) => (
                                    <div>
                                    <p>Item :  <span>{item.name}</span></p>
                                    <p>{item.quantity} X ₹{item.price} ={" "}
                                    <b>₹{(item.price * item.quantity)}</b></p>
                                    
                                  </div>

                                 ))
                              }
                               

                                

                                <div>
                                
                    

                                </div>

                            </div>

                                </div>

                                <div className="col-sm-3">

                                <div className="order-details">

                                <h4 className="mb-4">Payment</h4>
                                    <p className={
                                        order.paymentInfo && order.paymentInfo.status === "succeeded" ? "green" : "red"
                                    }>
                                        {
                                            order.paymentInfo && order.paymentInfo.status === "succeeded" ? "PAID" : "NOT PAID"
                                        }

                                    </p>
                               
                                <div>
                                    <p>Total Price :<span>₹{order.totalPrice && order.totalPrice} </span></p>

                                </div>
                                <div>
                                    <b><p>Order Status</p></b>
                                    <p className={order.orderStatus && order.orderStatus === "Delivered" ? "green" : "red"}>
                                        {order.orderStatus && order.orderStatus}

                                    </p>


                                </div>
                                    </div>
                            </div> </div>





                          
                            
                        </div>





                    </>
            }


        </>
    )
}

export default OrderDetails