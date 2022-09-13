import React, { useRef, useState, useEffect } from 'react'
import '../../css/authentication.css'
import { Link } from 'react-router-dom'
import { updatePassword, getProclearErrors } from '../../actions/userAction'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import Loader from '../layout/loader/Loader'
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstant'





const UpdatePassword = () => {


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const alert = useAlert()

    const { error, isUpdated, loading } = useSelector((state) => state.profile)
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")




    const updatePasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData()
        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(updatePassword(myForm));

    }


    useEffect(() => {




        if (error) {
            alert.error(error);
            toast.error("Password not match!!!")
            dispatch(getProclearErrors())
        }
        if (isUpdated) {
            toast.success("Update Succesfull")
            navigate('/account')
            dispatch({ type: UPDATE_PASSWORD_RESET })
            // setInterval(() => {
            //   window.location.reload();
            // }, 6000);


        }
    }, [dispatch, error, alert, isUpdated, navigate])




    return (
        <>
            {
                loading ? (<Loader />) :
                    <div className="LoginSignUpContainer">
                        <div className="LoginSignUpBox">
                            <h2>Update Profile</h2>


                            <form
                                encType="multipart/form-data"
                                onSubmit={updatePasswordSubmit}
                            >
                                <div className="loginPassword">
                               
                                    <i className="fa fa-lock" aria-hidden="true"></i>

                                    <input
                                        type="password"
                                        placeholder="Old Password"
                                        required
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                </div>
                                <div className="loginPassword">
                                    
                                    <i className="fa fa-lock" aria-hidden="true"></i>

                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        required
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>

                                <div className="loginPassword">
                                    
                                    <i className="fa fa-lock" aria-hidden="true"></i>

                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>



                                <input type="submit" value="Change"className="signUpBtn" />
                            </form>
                            <ToastContainer />

                        </div>
                    </div>
            }




        </>
    )
}

export default UpdatePassword