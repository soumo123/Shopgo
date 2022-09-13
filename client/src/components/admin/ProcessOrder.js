
import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getOrderDetails, updateOrder } from '../../actions/orderAction'
import Metadata from '../layout/Metadata'
import { Button } from "@material-ui/core";
import Loader from "../layout/loader/Loader";
import { UPDATE_ORDER_RESET } from '../../constants/orderConstant'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProcessOrder = () => {

  const { isUpdated } = useSelector((state) => state.order)
  const { order, error, loading } = useSelector((state) => state.orderDetails)
  const paramsId = useParams()
  const dispatch = useDispatch()

  const [status, setStatus] = useState("");

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(paramsId.id, myForm));
  };


  useEffect(() => {
    // if (error) {
    //   alert.error(error);
    //   dispatch(clearErrors());
    // }
    // if (updateError) {
    //   alert.error(updateError);
    //   dispatch(clearErrors());
    // }
    if (isUpdated) {
      toast.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(paramsId.id));
  }, [dispatch, alert, isUpdated, paramsId, toast]);





  return (
  
      <>
        {
          loading ? <Loader /> :
            <>

              <Metadata title="Process Order" />
              <div className="container">

                <div className="row mt-5 mb-5 justify-content-center">
                  <div className="col-sm-3">
                    <ul className="detail-image">
                      {order.orderItems &&
                        order.orderItems.map((item) => (
                          <li>
                            <Link to={`/product/${item.product}`}>
                              <div key={item.product}>
                                <img className="img-fluid" src={item.image} alt="Product" />
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
                      <p>Address : <span>{order.shippingInfo &&
                            `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}</span></p>



                      {
                        order?.orderItems?.map((item) => (
                          <div>
                            <p>Item :  <span>{item.name}</span></p>
                            <p>{item.quantity} X ₹{item.price} ={" "}
                              <b>₹{(item.price * item.quantity).toFixed(1)}</b></p>

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
                        <p>Total Price :<span>₹{order.totalPrice && order.totalPrice.toFixed(1)} </span></p>

                      </div>
                      <div>
                        <b><p>Order Status</p></b>
                        <p
                          className={
                            order.orderStatus && order.orderStatus === "Delivered"
                              ? "greenColor"
                              : "redColor"
                          }
                        >
                          {order.orderStatus && order.orderStatus}
                        </p>


                      </div>
                      <div
                  style={{
                    display: order.orderStatus === "Delivered" ? "none" : "block",
                  }}
                >
<form
                    className="updateOrderForm"
                    onSubmit={updateOrderSubmitHandler}
                  >
                    {/* <h1>Process Order</h1> */}

                    <div>

                      <select onChange={(e) => setStatus(e.target.value)}>
                        <option value="">Choose Category</option>
                        {order.orderStatus === "Processing" && (
                          <option value="Shipped">Shipped</option>
                        )}

                        {order.orderStatus === "Shipped" && (
                          <option value="Delivered">Delivered</option>
                        )}
                      </select>
                    </div>

                    <Button
                     variant="secondary"
                      id="createProductBtn"
                      type="submit"
                      disabled={
                        loading ? true : false || status === "" ? true : false
                      }
                    >
                      Process
                    </Button>
                  </form>
                  <ToastContainer
                  position="top-center"
                  autoClose={2000}
                  hideProgressBar={false}
                  newestOnTop={false}


                />


                </div>
                    </div>
                  </div> </div>







              </div>





            </>
        }


      </>

  )
}



export default ProcessOrder