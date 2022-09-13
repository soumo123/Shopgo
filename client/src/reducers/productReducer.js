import { ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL, CLEAR_ERRORS, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, 
    NEW_REVIEW_REQUEST,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_RESET,
    NEW_PRODUCT_FAIL,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
    NEW_REVIEW_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_RESET,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_RESET,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_RESET,
    DELETE_REVIEW_FAIL,
    DEAL_PRODUCT_REQUEST,
    DEAL_PRODUCT_SUCCESS,
    DEAL_PRODUCT_FAIL,
    LIKE_PRODUCT_REQUEST,
    LIKE_PRODUCT_SUCCESS,
    LIKE_PRODUCT_FAIL,
    LIKE_PRODUCT_RESET,
    GET_LIKE_PRODUCT_REQUEST,
    GET_LIKE_PRODUCT_SUCCESS,
    GET_LIKE_PRODUCT_FAIL,
    PRODUCT_DETAILS_FAIL,  
    PRODUCT_DETAILS_RESET} from '../constants/productConstants'
export const productReducer = (state = { products: [] }, action) => {
    
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
        case ADMIN_PRODUCT_REQUEST:
            return {
                loading: true,
                products: []
            }
            
        case ALL_PRODUCT_SUCCESS:

            return {
                loading: false,
                products: action.payload.products,
                productscount: action.payload.productscount,
                resultPerPage : action.payload.resultPerPage,
                filterProductsCount : action.payload.filterProductsCount
            }
        case ADMIN_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload
            }
        
        
        case ALL_PRODUCT_FAIL:
        case ADMIN_PRODUCT_FAIL:

            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:

            return {
                ...state,
                error: null
            }
        default:
            return state;
    }

}

//upload product by admin
export const newProductReducer = (state = { product: {} }, action) => {
   
   switch (action.type) 
    {
        case NEW_PRODUCT_REQUEST:
            return {
                loading: true,
                ...state
            }
        case NEW_PRODUCT_SUCCESS:
            return {
                loading: false,
                product: action.payload.product,
                success: action.payload.success
            }
        case NEW_PRODUCT_RESET:
            return{
                ...state,
                loading:false,
                success:false,
                error:false
            }
        case NEW_PRODUCT_FAIL:
            return {
                loading: false,
                error: true
            }
        case CLEAR_ERRORS:

            return {
                ...state,
                error: null
            }
        default:
            return state;
    }

}


export const productDetailsReducer = (state={},{type,payload})=>{
    switch(type){
        case PRODUCT_DETAILS_SUCCESS :
            return {...state,...payload }
        default :
            return state
    }
}




export const newReviewReducer = (state = {}, action) => {

    switch (action.type) {

        case NEW_REVIEW_REQUEST:
            return{
                ...state,
                loading:true,
            }
        case NEW_REVIEW_SUCCESS:
            return{
                loading:false,
                success: action.payload
            }
        case NEW_REVIEW_RESET:
            return{
                ...state,
                success:false
            }
        case NEW_REVIEW_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
            case CLEAR_ERRORS:

                return {
                    ...state,
                    error: null
                }
            default:
                return state;
        


    }



}


//delete prouct by admin
export const deleteProductAdminReducer = (state = {}, action) => {

    switch (action.type) {

        case DELETE_PRODUCT_REQUEST:
            case UPDATE_PRODUCT_REQUEST:
            return{
                ...state,
                loading:true
            }
        case DELETE_PRODUCT_SUCCESS:
            return{
                ...state,
                loading:false,
                isDeleted: action.payload
            }

            case UPDATE_PRODUCT_SUCCESS:
                return{
                    ...state,
                    loading:false,
                    isUpdated: action.payload
                }
            
        case DELETE_PRODUCT_RESET:
            return{
                ...state,
                isDeleted:false
            }

            case UPDATE_PRODUCT_RESET:
                return{
                    ...state,
                    isUpdated:false
                }


        case DELETE_PRODUCT_FAIL:
            case UPDATE_PRODUCT_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
            case CLEAR_ERRORS:

                return {
                    ...state,
                    error: null
                }
            default:
                return state;
        


    }



}


export const productDetailsReducers = (state = { product: {} }, action) => {
    switch (action.type) {
      case PRODUCT_DETAILS_REQUEST:
        return {
          loading: true,
          ...state,
        };
      case PRODUCT_DETAILS_SUCCESS:
        return {
          loading: false,
          product: action.payload,
        };
        case PRODUCT_DETAILS_RESET:
          return {
            ...state
          };
      case PRODUCT_DETAILS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };





  export const productReviewsReducers = (state = { reviews: [] }, action) => {
    switch (action.type) {
      case ALL_REVIEW_REQUEST:
        return {
          loading: true,
          ...state,
        };
      case ALL_REVIEW_SUCCESS:
        return {
          loading: false,
          reviews: action.payload,
        };
      case ALL_REVIEW_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };






  


  export const reviewReducer = (state = {}, action) => {

    switch (action.type) {

        case DELETE_REVIEW_REQUEST:
            return{
                ...state,
                loading:true
            }
        case DELETE_REVIEW_SUCCESS:
            return{
                loading:false,
                isDeleted: action.payload
            }
        case DELETE_REVIEW_RESET:
            return{
                ...state,
                isDeleted:false,
                error:false
            }
        case DELETE_REVIEW_FAIL:
            return{
                ...state,
                loading:false,
                error:true
            }
            case CLEAR_ERRORS:

                return {
                    ...state,
                    error: null
                }
            default:
                return state;
        


    }

}


export const dealProductReducers = (state = { product: [] }, action) => {
    switch (action.type) {
      case DEAL_PRODUCT_REQUEST:
        case LIKE_PRODUCT_REQUEST:
        return {
          loading: true,
          ...state,
        };
      case DEAL_PRODUCT_SUCCESS:
        return {
          loading: false,
          product: action.payload,
        };
        case LIKE_PRODUCT_SUCCESS:
            return {
              loading: false,
              isLiked: action.payload,
            };
            case LIKE_PRODUCT_RESET:
                return {
                  ...state,
                  isliked:false,
                };
      case DEAL_PRODUCT_FAIL:
        case LIKE_PRODUCT_FAIL:
       
        return {
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };











  export const likebleProductReducers = (state = { products: [] }, action) => {
    switch (action.type) {
            case GET_LIKE_PRODUCT_REQUEST:
        return {
          loading: true,
          ...state,
        };
            case GET_LIKE_PRODUCT_SUCCESS:
                return {
                  loading: false,
                  products: action.payload,
                };
        case GET_LIKE_PRODUCT_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };