import { ADD_TO_CART ,REMOVE_CART_ITEM,SAVE_SHIPPING_INFO} from '../constants/cartConstants'
import axios from 'axios'


//Add To Cart
export const addItemsToCart = (id, quantity) => async (dispatch,getState) => {

    const { data } = await axios.get(`http://localhost:8000/api/soummya/product/${id}`)
    console.log("addtocart",data)
    dispatch({
        type: ADD_TO_CART,
        payload:{
            product:data.product._id,
            name:data.product.name,
            price:data.product.actualpricebydiscount,
            stock:data.product.stock,
            image:data.product.images[0].url,
            quantity
        }
    })
    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
}

//Remove Cart

export const removeItemsToCart = (id) => async (dispatch,getState) => {

    dispatch({ type:REMOVE_CART_ITEM,payload:id})

    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
}


//Save Shipping Info//

export const saveShippingInfo = (data) => async (dispatch) => {

    dispatch({ type:SAVE_SHIPPING_INFO,payload:data})

    localStorage.setItem("shippingInfo",JSON.stringify(data))
}
