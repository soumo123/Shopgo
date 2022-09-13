import React from 'react'
import '../../../css/user.css'
import { Link } from 'react-router-dom'
import {Nav } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import profileImage from '../../../images/profile.png'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const UserOptions = () => {

  const navigate = useNavigate()
  const { isAuthenticated, user } = useSelector((state) => state.user)
  const { cartItems } = useSelector((state) => state.cart)



  const logout = () => {

    localStorage.removeItem("token")
    localStorage.removeItem("profile")
    toast.success("Logout Succesfully ");
    navigate('/products')

    setInterval(() => {
      window.location.reload();
    }, 2000);



  }



  return (


    <Nav className="align-items-center">

      {
        !isAuthenticated ?
          <>
            <Nav.Link>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="" data-bs-toggle="dropdown" aria-expanded="true">
                  <img src={profileImage} />
                </Link>



                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/login" >Login</Link></li>
                  <li><Link className="dropdown-item" to="/cart" >Cart</Link><p>{cartItems.length} items</p></li>
                </ul>
              </li>
            </Nav.Link>
          </>
          : <>
            <Nav.Link>
              <li className="nav-item"> {user?.name}</li>

            </Nav.Link>
            <Nav.Link>
              <li className="nav-item dropdown">

                <Link to="" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="true">
                  <img src={user?.avatar?.url} />
                </Link>

                {
                  user?.role === "admin" ?

                    <ul class="dropdown-menu">

                      <li><Link className="dropdown-item" to="/order"><i class="fa fa-shopping-bag" aria-hidden="true"></i>
                        Orders</Link></li>
                      <li><Link className="dropdown-item" to="/account" ><i class="fa fa-user" aria-hidden="true"></i>
                        Account</Link></li>
                      <li><Link className="dropdown-item" to="/admin/dashboard"><i class="fa fa-tachometer" aria-hidden="true"></i>
                        Dashboard</Link></li>
                      <li><Link className="dropdown-item item-count" to="/cart" ><i class="fa fa-shopping-cart" aria-hidden="true"></i>
                        Cart <span>{cartItems.length}</span> </Link></li>
                      <li><p className="dropdown-item" onClick={logout} ><i class="fa fa-sign-out" aria-hidden="true"></i>
                        Logout</p></li>


                    </ul> : <ul class="dropdown-menu">
                      <li><Link className="dropdown-item" to="/account">Account</Link></li>
                      <li><Link className="dropdown-item" to="/order">Orders</Link></li>
                      <li><Link className="dropdown-item item-count" to="/cart" ><i class="fa fa-shopping-cart" aria-hidden="true"></i>
                        Cart <span>{cartItems.length}</span> </Link></li>
                      <li ><p className="dropdown-item" onClick={logout} >Logout</p></li>

                    </ul>
                }



                <ToastContainer
                  position="top-center"
                  autoClose={2000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover />
              </li>
            </Nav.Link></>

      }



    </Nav>


  )
}

export default UserOptions