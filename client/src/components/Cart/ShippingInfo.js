import React, { useState, useEffect } from 'react'
import '../../css/shipping.css'
import {useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import CheckoutSteps from './CheckoutSteps'
import { saveShippingInfo } from '../../actions/cartAction'
import Metadata from '../layout/Metadata'
import { Country, State, City } from 'country-state-city';

const ShippingInfo = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { shippingInfo } = useSelector((state) => state.cart)
  const [address, setAddress] = useState(shippingInfo.address)
  const [city, setCity] = useState(shippingInfo.city)
  const [state, setState] = useState(shippingInfo.state)
  const [country, setCountry] = useState(shippingInfo.country)
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)


const shippingSubmit = (e)=>{
  e.preventDefault()
  
  if(phoneNo.length < 10 || phoneNo.length > 10){
    alert("Phone Number Should be 10 Digit")
    return
  }

  dispatch(saveShippingInfo({address,city,state,country,pinCode,phoneNo}))
  navigate("/order/confirm")

}




  return (
    <>
    <Metadata title="Shipping Details"/>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-12">
    <CheckoutSteps activeStep={0}/>
    
<div className="formdiv">
<h1>ShippingInfo</h1>
      <form className="form"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div className="row">
           
            <div className="col-sm-4 ">
              <div className="mb-3">
            <label className="form-label">Address</label>

              <input
                type="text" className="form-control inputtext"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              </div>
            </div>

            <div className="col-sm-4 ">
              <div className="mb-3">
            <label className="form-label">City</label>
              
              <input
                type="text" className="form-control inputtext"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            </div>

            <div className="col-sm-4 ">
              <div className="mb-3">
            <label className="form-label">Pin Code</label>
              
              <input
                type="number" className="form-control inputtext"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>
            </div>

            <div className="col-sm-4 ">
              <div className="mb-3">
            <label className="form-label">Phone Number</label>
              
              <input
                type="number" className="form-control inputtext"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>
            </div>

           
              
            <div className="col-sm-4 ">
              <div className="mb-3">
            <label className="form-label">Country</label>
              <select className="form-control inputtext"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
              </div>
            </div>

            {country && (
              <div className="col-sm-4 ">
              <div className="mb-3">
            <label className="form-label">State</label>               

                <select className="form-control inputtext"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
              </div>
            )}
    <div className="col-sm-12 text-center">
              <div className="mb-3">
            <input 
              type="submit"
              value="Continue"
              className="button cart_button_checkout"
              disabled={state ? false : true}
            />
            </div>
            </div>
            </div>
          </form>
          </div>
          </div>
          </div>
          </div>



    </>




  )
}

export default ShippingInfo