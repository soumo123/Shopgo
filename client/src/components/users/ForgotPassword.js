
import React, { useRef, useState, useEffect } from 'react'
import '../../css/authentication.css'
import { Link } from 'react-router-dom'
import { forgotPassword, getProclearErrors } from '../../actions/userAction'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import Loader from '../layout/loader/Loader'
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstant'

const ForgotPassword = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const alert = useAlert()
   
    const { error, message, loading } = useSelector((state) => state.forgotPassword)

    const [email,setEmail] = useState("")

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData()
        myForm.set("email", email);
        dispatch(forgotPassword(myForm));
        
    }


    
    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(getProclearErrors())
        }
        if (message) {
            toast.success(message)


        }
    }, [dispatch, error, alert,message])




  return (
    <>
    {
        loading ? (<Loader/>): 
        <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
        <h2>Forgot Password</h2>


             <form
            onSubmit={forgotPasswordSubmit}
          >
        
            <div className="signUpEmail">
            <i className="fa fa-envelope-o" aria-hidden="true"></i>
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
            <input type="submit" value="Send" className="signUpBtn" />
          </form> 
          <ToastContainer />

            </div>
        </div>
    }



        
    </>
  )
}

export default ForgotPassword