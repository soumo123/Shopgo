import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {useLocation,Link} from 'react-router-dom'
import Metadata from '../layout/Metadata'
import profileImage from '../../images/profile.png'
import '../../css/profile.css'

const Profile = () => {
  const location = useLocation()
 

    const {isAuthenticated,user} = useSelector((state)=>state.user) 
    console.log("users",isAuthenticated) 


  return (
  <>
  {
     isAuthenticated && <>
      <Metadata title={`${user?.name}'s Profile`}/>
  <div className="wrapper">
  <div className="profile-card js-profile-card">
    <div className="profile-card__img">
      <img src={user?.avatar.url} alt="profile card"/>
    </div>

    <div className="profile-card__cnt js-profile-cnt">
      <div className="profile-card__name">{user?.name}</div>
      <div className="profile-card__txt">Email : <strong>{user?.email}</strong></div>
      <div className="profile-card-loc">
        <span className="profile-card-loc__icon">
        </span>

        <span className="profile-card-loc__txt">
          Role : {user?.role}
        </span>
      </div>

      <div className="profile-card-inf">
        <div className="profile-card-inf__item">
          <div className="profile-card-inf__title">Edit Profile</div>
          <Link to="/me/update"><button className="profile-card__button button--blue js-message-btn">Edit Profile</button></Link>
          {/* <div className="profile-card-inf__txt"></div> */}
        </div>
      </div>

      <div className="profile-card-ctr">
       <Link to="/order"><button className="profile-card__button button--blue js-message-btn me-2">My Orders</button></Link>
       <Link to="/password/update"><button className="profile-card__button button--orange me-2">Forgot Password</button></Link>
      </div>
    </div>

    <div className="profile-card-message js-message">
      <form className="profile-card-form">
        <div className="profile-card-form__container">
          <textarea placeholder="Say something..."></textarea>
        </div>

        <div className="profile-card-form__bottom">
          <button className="profile-card__button button--blue js-message-close">
            Send
          </button>

          <button className="profile-card__button button--gray js-message-close">
            Cancel
          </button>
        </div>
      </form>

      <div className="profile-card__overlay js-message-close"></div>
    </div>

  </div>

</div>

      
      </>



  }
  
  </>
  )
}

export default Profile