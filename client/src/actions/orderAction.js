import {
    CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAIL, MY_ORDER_REQUEST,
    MY_ORDER_SUCCESS,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ALL_ORDER_REQUEST,
    ALL_ORDER_SUCCESS,
    ALL_ORDER_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    MY_ORDER_FAIL, CLEAR_ERRORS
} from '../constants/orderConstant'
import axios from 'axios'
//New order

//Add To Cart
export const createOrder = (order) => async (dispatch, getState) => {


    try {
        const token = localStorage.getItem('token')
        dispatch({ type: CREATE_ORDER_REQUEST })

        const config = {
            headers: {
                'Content-Type': "application/json",
                // 'Accept':"/"
            },
            withCredentials: true
        }

        const { data } = await axios.post(`http://localhost:8000/api/soummya/order/new/${token}`, order, config)
        
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data })


    } catch (error) {
        dispatch({ type: CREATE_ORDER_FAIL, payload: error.response.data.message })
    }

}


//My orders




export const myOrders = () => async (dispatch, getState) => {

    try {

        const token = localStorage.getItem('token')
        dispatch({ type: MY_ORDER_REQUEST })

        const { data } = await axios.get(`http://localhost:8000/api/soummya/orders/me/${token}`)
        dispatch({ type: MY_ORDER_SUCCESS, payload: data.orders })



    } catch (error) {
        dispatch({ type: MY_ORDER_FAIL, payload: error.response.data.message })
    }


}





//Get single order


export const getOrderDetails = (id) => async (dispatch) => {

    try {
        console.log("idddd", id)
        const token = localStorage.getItem('token')
        dispatch({ type: ORDER_DETAILS_REQUEST })

        const { data } = await axios.get(`http://localhost:8000/api/soummya/order/${id}/${token}`)
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order })



    } catch (error) {
        dispatch({ type: ORDER_DETAILS_FAIL, payload: error.response.data.message })
    }


}



//Get all orders by admin 

export const getAllOrders = () => async (dispatch) => {

    try {

        const token = localStorage.getItem('token')
        dispatch({ type: ALL_ORDER_REQUEST })

        const { data } = await axios.get(`http://localhost:8000/api/soummya/admin/orders/${token}`)
        dispatch({ type: ALL_ORDER_SUCCESS, payload: data.orders })



    } catch (error) {
        dispatch({ type: ALL_ORDER_FAIL, payload: error.response.data.message })
    }


}


//Update Order by  Admin 




export const updateOrder = (id,order) => async (dispatch) => {

    try {
        const token = localStorage.getItem('token')
        dispatch({ type: UPDATE_ORDER_REQUEST })

        const config = {
            headers: {
                'Content-Type': "application/json",
            },
            withCredentials: true
        }

        const { data } = await axios.put(`http://localhost:8000/api/soummya/admin/order/${id}/${token}`, order, config)
        dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success })
    } catch (error) {
        dispatch({ type: UPDATE_ORDER_FAIL, payload: error.response.data.message })
    }

}


//delete order By admin

export const deleteOrder = (id) => async (dispatch) => {

    try {
        const token = localStorage.getItem('token')
        dispatch({ type: DELETE_ORDER_REQUEST })
        const { data } = await axios.delete(`http://localhost:8000/api/soummya/admin/order/${id}/${token}`)
        dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success })
    } catch (error) {
        dispatch({ type: DELETE_ORDER_FAIL, payload: error.response.data.message })
    }

}



//sending mail///

export const sendMail = (to) => async () => {
try {
    console.log("too",to)
    const config = {
        headers: {
            'Content-Type': "application/json",
            // 'Accept':"/"
        },
        withCredentials: true
    }

    const mesage = await axios.post(`http://localhost:8000/api/soummya/message`, {to:to})
    console.log("message",mesage)
} catch (error) {
    console.log(error)
}

}






export const getProclearErrors = () => async (dispatch) => {

    dispatch({ type: CLEAR_ERRORS })
}
