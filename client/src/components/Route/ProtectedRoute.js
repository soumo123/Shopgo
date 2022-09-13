import React from 'react'
import { useEffect } from 'react';
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { BrowserRouter , Routes} from "react-router-dom";

const ProtectedRoute = (props) => {
    const navigate = useNavigate()
    const {Component} = props
    const {isloading,isAuthenticated,user} = useSelector((state)=>state.user)
    console.log("loading",isloading)
    useEffect(() => {
        
        if(!isAuthenticated){
            navigate('/account')
        }

    }, [])
    


  return (
   <>

   <Component/>
   {/* <BrowserRouter>
    <Routes>
   {
    !loading && (
        
        <Route
        {...rest}
        render = {(props)=>{

            if(!isAuthenticated){
                return <Navigate to="/login"/>
            }

            return <Component {...props}/>
        }}
        
        />
    
    )
   }
   
   </Routes>
   </BrowserRouter> */}







   </>
  )
}

export default ProtectedRoute