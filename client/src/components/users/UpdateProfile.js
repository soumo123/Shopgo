
import React, { useRef, useState, useEffect } from 'react'
import '../../css/authentication.css'
import { Link } from 'react-router-dom'
import { updateProfile, getProclearErrors, loadUser } from '../../actions/userAction'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import Loader from '../layout/loader/Loader'
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstant'





const UpdateProfile = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const alert = useAlert()
    const { user } = useSelector((state) => state.user)
    const { error, isUpdated, loading } = useSelector((state) => state.profile)
    console.log("updated profile",user)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [avatar, setAvatar] = useState()
    const [avatarPreview, setAvatarPreview] = useState("/profile.png")


    const updateProfileSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData()
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        dispatch(updateProfile(myForm));
        
    }

    const updateProfileDataChange = (e) => {

        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])

    }




    useEffect(() => {

        if (user) {
            setName(user?.name)
            setEmail(user?.email)
            setAvatarPreview(user?.avatar.url)
        }


        if (error) {
            alert.error(error);
            toast.error("Invalid Credentials")
            dispatch(getProclearErrors())
        }
        if (isUpdated) {
            toast.success("Update Succesfull")
            dispatch(loadUser())
            navigate('/account')
            dispatch({ type: UPDATE_PROFILE_RESET })
            // setInterval(() => {
            //   window.location.reload();
            // }, 6000);


        }
    }, [dispatch, error, alert, user, isUpdated, navigate])





    return (
        <>
        {
            loading ? (<Loader/>): 
            <div className="LoginSignUpContainer">
                <div className="LoginSignUpBox">
            <h2>Update Profile</h2>


                 <form
             
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="signUpName">
                <i className="fa fa-user" aria-hidden="true"></i>
                  <input
                    type="text"
                    placeholder="Name"
                   
                    name="name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                  />
                </div>
                <div className="signUpEmail">
                <i className="fa fa-envelope-o" aria-hidden="true"></i>
                  <input
                    type="email"
                    placeholder="Email"
                    
                    name="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                </div>
                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input type="submit"  className="signUpBtn" />
              </form> 
              <ToastContainer />

                </div>
            </div>
        }



            
        </>
    )
}

export default UpdateProfile