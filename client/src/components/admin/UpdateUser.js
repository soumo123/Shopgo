import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import{useNavigate} from 'react-router-dom'
import Sidebar from './Sidebar'
import {useSelector,useDispatch} from 'react-redux'
import {getProclearErrors,updateUser,getUserDetails} from '../../actions/userAction'
import { UPDATE_USER_RESET } from '../../constants/userConstant'
import Metadata from '../layout/Metadata'
import Loader from '../../components/layout/loader/Loader'

import { useAlert } from 'react-alert'

const UpdateUser = () => {

const alert = useAlert()
const dispatch = useDispatch()
const navigate = useNavigate()
const {loading,user,error} =useSelector((state) => state.userDetails)
const {isUpdated,loading:updateLoading,} =useSelector((state) => state.profile)
console.log("dataaaaaaaaaa",user)
const paramsId = useParams()

const[name,setName] = useState("")
const[email,setEmail] = useState("")
const[role,setRole] = useState("")



const categories = [
    "oven",
    "electronics",
    "machine",
    "accesries",
    "Shirts",
    "Jweallries"
  ]


  useEffect(() => {
    if (user && user?._id !== paramsId.id) {
        dispatch(getUserDetails(paramsId.id));
      } else {
        setName(user?.name);
        setEmail(user?.email);
        setRole(user?.role);
        
      }



   if(error){
    alert.error("Not Updated!!!")
    dispatch(getProclearErrors())
   }
   if(isUpdated){
    alert.success("User Updated Succsfully")
    dispatch({type:UPDATE_USER_RESET})
    navigate("/admin/dashboard")
   }
   
  }, [dispatch,alert,navigate,user,paramsId,isUpdated])
  


  const updateUserSubmitHandler = (e)=>{
    e.preventDefault()
    const myForm = new FormData()
    myForm.set("name",name)
    myForm.set("email",email)
    myForm.set("role",role)
    dispatch(updateUser(paramsId.id,myForm))
}

    return (
        <>
        <Metadata title="Update User"/>
            {loading ? <Loader/> :
            

     <div className="container-fluid display-table">
      <div className="row display-table-row">
  <Sidebar/>
                        <div className="formdiv">
                            <h1>Update User</h1>
                            <form className="form"
                                onSubmit={updateUserSubmitHandler}
                            >
                                <div className="row">

                                    <div className="col-sm-4 ">
                                        <div className="mb-3">
                                            <label className="form-label">Name</label>

                                            <input
                                                type="text" className="form-control inputtext"
                                                placeholder="Name"
                                                required
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-sm-4 ">
                                        <div className="mb-3">
                                            <label className="form-label">Email</label>

                                            <input
                                                type="email" className="form-control inputtext"
                                                placeholder="email"
                                                 required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-sm-4 ">
                                        <div className="mb-3">
                                            <label className="form-label">Role</label>
                                        <select value={role} onChange={(e)=>setRole(e.target.value)}>
                                            <option value="">Choose Role</option> 
                                            <option value="admin">Admin</option> 
                                            <option value="user"> User</option> 
                                        </select>
                                           
                                        </div>
                                    </div>

                                
                                    <div className="col-sm-12 text-center">
                                        <div className="mb-3">
                                            <input
                                                type="submit"
                                                value="Update"
                                                className="button cart_button_checkout"
                                                disabled={updateLoading ? true : false  || role === "" ? true : false}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            
}
        </>
    )
}

export default UpdateUser