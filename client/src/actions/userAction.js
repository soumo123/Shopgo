import { LOGIN_SUCCESS, 
    LOGIN_REQUEST,
     LOGIN_FAIL, 
     REGISTER_USER_REQUEST,
     REGISTER_USER_SUCCESS,
     REGISTER_USER_FAIL,
     LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    ALL_USER_REQUEST,
    ALL_USER_SUCCESS,
    ALL_USER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_RESET,
    UPDATE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_RESET,
    DELETE_USER_FAIL,
    CLEAR_ERRORS } from '../constants/userConstant'


import axios from 'axios'

//login action
export const login = (email, password) => async (dispatch) => {

    try {
        dispatch({ type: LOGIN_REQUEST })
        const config = {
            headers: {
                'Content-Type': "application/json",
                // 'Accept':"/"
            },
            withCredentials: true
        }
        const { data } = await axios.post("http://localhost:8000/api/soummya/login", { email, password },config)
        const profileData = data.user
        console.log("data",data)
        localStorage.setItem("token",data.token)
        localStorage.setItem("profile", JSON.stringify(profileData))
        dispatch({ type: LOGIN_SUCCESS, payload: data})
    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message })
    }

}



//registration
export const register = (userData) => async (dispatch) => {

    try {
        dispatch({ type: REGISTER_USER_REQUEST })
        const config = {
            headers: {
                'Content-Type': "multipart/form-data"
            }
        }
        const link  ='http://localhost:8000/api/soummya/register'
        const { data } = await axios.post(link, userData, config)
        dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user })
        
    } catch (error) {
        dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.message })
    }

}


//Load user

export const loadUser = () => async (dispatch) => {

    try {
       
        // dispatch({ type: LOAD_USER_REQUEST })
        const token = localStorage.getItem('token')
        const { data } = await axios.get(`http://localhost:8000/api/soummya/me/${token}`)
   
        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user})
    } catch (error) {
        dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message })
    }

}

export const logout = () => async (dispatch) => {

    try {
       
        // const token = localStorage.getItem('token')
        await axios.get("http://localhost:8000/api/soummya/logout")
   
        dispatch({ type: LOGOUT_SUCCESS})
    } catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message })
    }

}





//Update Profile

export const updateProfile = (userData) => async (dispatch) => {

    try {
        dispatch({ type:  UPDATE_PROFILE_REQUEST })
        const token = localStorage.getItem('token')
        const config = {
            headers: {
                'Content-Type': "multipart/form-data"
            },
            withCredentials: true
        }
        const link  = `http://localhost:8000/api/soummya/me/update/${token}`
        const { data } = await axios.put(link,userData , config)
        console.log("updated data",data)
        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: UPDATE_PROFILE_FAIL, payload: error.response.data.message })
    }

}


///Update or Reset password





export const updatePassword = (passwords) => async (dispatch) => {

    try {
        dispatch({ type:  UPDATE_PASSWORD_REQUEST })
        const token = localStorage.getItem('token')
        const config = {
            headers: {
                'Content-Type': "multipart/form-data"
            },
            withCredentials: true
        }
        const link  = `http://localhost:8000/api/soummya/password/update/${token}`
        const { data } = await axios.put(link,passwords,config)
        console.log("updated password ",data)
        dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: UPDATE_PASSWORD_FAIL, payload: error.response.data.message })
    }

}


//Forgot Password //

export const forgotPassword = (email) => async (dispatch) => {

    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST })
        const config = {
            headers: {
                'Content-Type': "application/json",
                // 'Accept':"/"
            },
            withCredentials: true
        }
        const { data } = await axios.post("http://localhost:8000/api/soummya/password/forgot", email,config)
        dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message})
    } catch (error) {
        dispatch({ type: FORGOT_PASSWORD_FAIL, payload: error.response.data.message })
    }

}



//get all users

export const getAllUsers = () => async (dispatch) => {

    try {
        dispatch({ type:  ALL_USER_REQUEST })
        const token = localStorage.getItem('token')
        const { data } = await axios.get(`http://localhost:8000/api/soummya/admin/users/${token}`)
       
        dispatch({ type: ALL_USER_SUCCESS, payload: data.users })
    } catch (error) {
        dispatch({ type: ALL_USER_FAIL, payload: error.response.data.message })
    }

}


//get User Details

export const getUserDetails = (id) => async (dispatch) => {

    try {
        dispatch({ type:  USER_DETAILS_REQUEST })
        const token = localStorage.getItem('token')
        const { data } = await axios.get(`http://localhost:8000/api/soummya/admin/user/${id}/${token}`)
      
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user })
    } catch (error) {
        dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message })
    }

}

//update user details


export const updateUser = (id,userData) => async (dispatch) => {

    try {
        dispatch({ type:  UPDATE_USER_REQUEST })
        const token = localStorage.getItem('token')
        const config = {
            headers: {
                'Content-Type': "multipart/form-data"
            },
            withCredentials: true
        }
        const { data } = await axios.put(`http://localhost:8000/api/soummya/admin/user/${id}/${token}`,userData , config)
        
        dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success })
    } catch (error) {
        dispatch({ type: UPDATE_USER_FAIL, payload: error.response.data.message })
    }

}


//delete userr

export const deleteUser = (id) => async (dispatch) => {

    try {
        dispatch({ type:  DELETE_USER_REQUEST })
        const token = localStorage.getItem('token')
        const { data } = await axios.delete(`http://localhost:8000/api/soummya/admin/user/${id}/${token}`)
        
        dispatch({ type: DELETE_USER_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: DELETE_USER_FAIL, payload: error.response.data.message })
    }

}




export const getProclearErrors = () => async (dispatch) => {

    dispatch({ type: CLEAR_ERRORS })
}