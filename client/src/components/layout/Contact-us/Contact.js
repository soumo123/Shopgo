import React from 'react'
import '../../../css/contact.css'
const Contact = () => {
  return (
   <>
    <div className="container left-side">
    <div className="row content mt-5 mb-5">
        <div className="col-sm-4 address details">
          <i className="fas fa-map-marker-alt"></i>
          <div className="topic">Address</div>
          <div className="text-one">Kolkata</div>
          <div className="text-two">West Bengal</div>
        </div>
        <div className="col-sm-4 phone details">
          <i className="fas fa-phone"></i>
          <div className="topic">Phone</div>
          <div className="text-one">+91 9874266014</div>
       
        </div>
        <div className="col-sm-4 email details">
          <i className="fas fa-envelope"></i>
          <div className="topic">Email</div>
          <div className="text-one">shoppersgoo@gmail.com</div>
          {/* <div className="text-two">info.codinglab@gmail.com</div> */}
        </div>
      </div>
   
    </div>  
   
   </>
  )
}

export default Contact