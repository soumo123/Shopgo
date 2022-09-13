import './App.css';
import React from "react";
import {useEffect,useState} from 'react'
import { BrowserRouter , Routes,Route} from "react-router-dom";
import Header from './components/layout/Header/Header.js'
import Footer from './components/layout/Footer/Footer'
import Home from './components/Home/Home.js'
import ProductDetails from './components/products/ProductDetails'
import AllProduct from './components/products/AllProduct';
import SearchPrpduct from './components/products/SearchPrpduct';
import Authentication from './components/users/Authentication';
import Profile from './components/users/Profile';
import UpdateProfile from './components/users/UpdateProfile';
import UpdatePassword from './components/users/UpdatePassword';
import ForgotPassword from './components/users/ForgotPassword';
import Cart from './components/Cart/Cart'
import store from './store'
import axios from 'axios'
import { loadUser } from './actions/userAction';
import UserOptions from './components/layout/Header/UserOptions';
import ProtectedRoute from './components/Route/ProtectedRoute'
import {useSelector} from 'react-redux'
import ShippingInfo from './components/Cart/ShippingInfo';
import ConfirmOrder from './components/Cart/ConfirmOrder';
import Payment from './components/Cart/Payment';
import { Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import OrderSuccess from './components/Cart/OrderSuccess';
import MyOrder from './components/Order/MyOrder';
import OrderDetails from './components/Order/OrderDetails';
import Dashboard from './components/admin/Dashboard';
import ProductList from './components/admin/ProductList';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrderList from './components/admin/OrderList';
import ProcessOrder from './components/admin/ProcessOrder';
import UsersList from './components/admin/UsersList';
import UpdateUser from './components/admin/UpdateUser';
import ProductReviews from './components/admin/ProductReviews';
import CodPayment from './components/Cart/CodPayment';
import NoteFound from './components/layout/Not-Found/NoteFound';
import Contact from './components/layout/Contact-us/Contact';


function App() {


  const[stripeApiKey,setStripeApiKey] = useState("")
const token = localStorage.getItem('token')
  async function getStripeApiKey(){
    const {data} = await axios.get(`http://localhost:8000/api/soummya/stripeApiKey/${token}`)
    setStripeApiKey(data.stripeApiKey)
  }
  

useEffect(() => {
  store.dispatch(loadUser())
  getStripeApiKey()
}, [])


const {isAuthenticated,user} = useSelector((state)=>state.user)  
const {order} = useSelector((state)=>state.newOrder)

console.log(order && order.success)

  return (
    
    <BrowserRouter>
      <Header/>
      
    {/* {isAuthenticated && <UserOptions user={user}/> } */}
      <Routes>
     
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/product/:productId" element={<ProductDetails/>} />
        <Route exact path="/contact" element={<Contact/>} />
        <Route exact path="/products" element={<AllProduct/>} />
        <Route  path="/products/:keyword" element={<AllProduct/>} />
        <Route exact path="/search" element={<SearchPrpduct/>} />
        <Route exact path="/account" element={<ProtectedRoute Component={Profile}/>} />
       <Route exact path="/login" element={<Authentication />} />
       {isAuthenticated && <Route exact path="/me/update" element={<UpdateProfile />} />}
       {isAuthenticated && <Route exact path="/password/update" element={<UpdatePassword />} />}
       <Route exact path="/password/forgot" element={<ForgotPassword />}/>
       <Route exact path="/cart" element={<Cart/>} />
       {isAuthenticated && <Route exact path="/shipping" element={<ShippingInfo />} />}
       {isAuthenticated && <Route exact path="/order/confirm" element={<ConfirmOrder />} />}
       {isAuthenticated && <Route exact path="/payment/cod" element={<CodPayment />} />}

       
       {isAuthenticated && <Route exact path="/process/payment" element={
        <Elements stripe={loadStripe(stripeApiKey)}> 
        <Payment/>
        
        </Elements>

       } />}
      {order && order.success && <Route exact path="/success" element={<OrderSuccess/>}/>}
      {isAuthenticated && <Route exact path="/order" element={<MyOrder/>}/>}
      {isAuthenticated && <Route exact path="/order/:id" element={<OrderDetails/>}/>}
      {user?.role === "admin" ?  <Route exact path="/admin/dashboard" element={<Dashboard/>}/> : user?.role ==="user" ? <Route exact path="/admin/dashboard" element={<Home/>}/> : <Route exact path="/admin/dashboard" element={<Home/>}/>}
      {user?.role === "admin" ?  <Route exact path="/admin/products" element={<ProductList/>}/> : user?.role ==="user" ? <Route exact path="/admin/prducts" element={<Home/>}/> : <Route exact path="/admin/dashboard" element={<Home/>}/>}
      {user?.role === "admin" ?  <Route exact path="/admin/create" element={<NewProduct/>}/> : user?.role ==="user" ? <Route exact path="/admin/prducts" element={<Home/>}/> : <Route exact path="/admin/dashboard" element={<Home/>}/>}
      {user?.role === "admin" ?  <Route exact path="/admin/product/:id" element={<UpdateProduct/>}/> : user?.role ==="user" ? <Route exact path="/admin/prducts" element={<Home/>}/> : <Route exact path="/admin/dashboard" element={<Home/>}/>}
      {user?.role === "admin" ?  <Route exact path="/admin/orders" element={<OrderList/>}/> : user?.role ==="user" ? <Route exact path="/admin/prducts" element={<Home/>}/> : <Route exact path="/admin/dashboard" element={<Home/>}/>}
      {user?.role === "admin" ?  <Route exact path="/admin/order/:id" element={<ProcessOrder/>}/> : user?.role ==="user" ? <Route exact path="/admin/prducts" element={<Home/>}/> : <Route exact path="/admin/dashboard" element={<Home/>}/>}
      {user?.role === "admin" ?  <Route exact path="/admin/users" element={<UsersList/>}/> : user?.role ==="user" ? <Route exact path="/admin/prducts" element={<Home/>}/> : <Route exact path="/admin/dashboard" element={<Home/>}/>}
      {user?.role === "admin" ?  <Route exact path="/admin/user/:id" element={<UpdateUser/>}/> : user?.role ==="user" ? <Route exact path="/admin/prducts" element={<Home/>}/> : <Route exact path="/admin/dashboard" element={<Home/>}/>}
      {user?.role === "admin" ?  <Route exact path="/admin/reviews" element={<ProductReviews/>}/> : user?.role ==="user" ? <Route exact path="/admin/prducts" element={<Home/>}/> : <Route exact path="/admin/dashboard" element={<Home/>}/>}

    

      <Route exact path = "*"element={<NoteFound/>}/>
      </Routes>
    <Footer />
  </BrowserRouter>
  );
}


export default App;
