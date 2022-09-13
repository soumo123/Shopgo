import React from 'react';
import {Link} from 'react-router-dom'
import './footer.css'
const Footer = () => {
  return (
 <>
<footer className="footer">
<div className="container bottom_border">
<div className="row">
<div className=" col-sm-4 col-md col-sm-4  col-12 col">
<h5 className="headin5_amrc col_white_amrc pt2">CUSTOMER SERVICE</h5>

<p className="mb10">Help & FAQs</p>
<p className="mb10">Order Tracking</p>
<p className="mb10">Shipping & Delivery</p>



</div>


<div class=" col-sm-4 col-md  col-6 col">
<h5 class="headin5_amrc col_white_amrc pt2">About us</h5>

<ul class="footer_ul_amrc">
<p>Fastest Delivery</p>
<p>Easy Payment</p>
<p>Help</p>

</ul>

</div>


<div className=" col-sm-4 col-md  col-6 col">
<h5 className="headin5_amrc col_white_amrc pt2">Follow Us</h5>

<ul className="footer_ul_amrc">
<li><Link to="http://webenlance.com"><i className="fa fa-facebook-official me-2" aria-hidden="true"></i>shopgo.com</Link></li>
<li><Link to="http://webenlance.com"><i className="fa fa-instagram me-2" aria-hidden="true"></i>shopgo</Link></li>
</ul>

</div>


<div className=" col-sm-4 col-md  col-12 col">
<h5 className="headin5_amrc col_white_amrc pt2">Contact us</h5>


<p><i className="fa fa-location-arrow"></i>Kolkata,WB, India</p>
<p><i className="fa fa-phone"></i>  +91-9874266014  </p>
<p><i className="fa fa fa-envelope"></i> shoppersgoo@gmail.com</p>

</div>
</div>
</div>
 		
		</footer>
 </>

   
  )
};

export default Footer;
