import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productDetailsReducer,productReducer,newReviewReducer,newProductReducer,deleteProductAdminReducer,productDetailsReducers,productReviewsReducers,reviewReducer,dealProductReducers, likebleProductReducers} from './reducers/productReducer'
import {userReducer,profileReducer,forgotPasswordReducer,allUsersReducer,userDetailsReducer} from './reducers/userReducer'
import {cartReducer} from './reducers/cartReducer'
import {globalReducer} from './reducers/globalReducer'
import { newOrderReducer,myOrderReducer,orderDetailsReducer,allOrdersReducer,orderReducer } from './reducers/orderReducer'
const reducer = combineReducers({
    products: productReducer,
    product : productDetailsReducer,
    user:userReducer,
    profile:profileReducer,
    forgotPassword:forgotPasswordReducer,
    cart:cartReducer,
    newOrder:newOrderReducer,
    myOrders:myOrderReducer,
    orderDetails:orderDetailsReducer,
    newReview:newReviewReducer,
    newProduct:newProductReducer,
    productAdmin:deleteProductAdminReducer,
    productDetailsReducers:productDetailsReducers,
    allOrders:allOrdersReducer,
    order:orderReducer,
    allUsers:allUsersReducer,
    userDetails:userDetailsReducer,
    productReviews:productReviewsReducers,
    review:reviewReducer,
    dealProduct:dealProductReducers,
    likeableProducts:likebleProductReducers,
    globalReducer:globalReducer
})

let initialState ={
    cart: {
        cartItems: localStorage.getItem("cartItems")
          ? JSON.parse(localStorage.getItem("cartItems"))
          : [],
        shippingInfo: localStorage.getItem("shippingInfo")
          ? JSON.parse(localStorage.getItem("shippingInfo"))
          : {},
      },

}



const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;