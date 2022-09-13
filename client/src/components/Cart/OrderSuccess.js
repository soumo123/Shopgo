import React from 'react'
import {Link} from 'react-router-dom'

const OrderSuccess = () => {
  return (
    <>
    <div className="container mb-5 mt-5">
      <div className="row">
         <div className="col-lg-12 text-center">
         <div>
          <i className="fa fa-check-circle text-success fa-4x mb-4"></i>
          <h2>OrderSuccessfully Placed !!</h2>
          <h2>Check Your Email</h2>
          </div>
          <Link to ="/order" className="btn add-to-cart">View Orders</Link>
         </div>
        </div>
    </div>
  
    </>
    
  )
}

export default OrderSuccess