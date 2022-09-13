import {

    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    CLEAR_ERRORS


} from '../constants/userConstant'



export const globalReducer = (state = { globalData: {} }, action) => {
    switch (action.type) {
        case  LOAD_USER_REQUEST:
            return {
                ...state,
                loading:true,
            }
        case LOAD_USER_SUCCESS:
            return{
                isAutheticated: action.payload == null ? false : true,
                isloading: action.payload == null ? true : false,
                globalData: action.payload
            }
            case LOAD_USER_FAIL:
                return {
                    ...state,
                    loading: false,
                    isAuthenticated: false,
                    globalData: null,
                    error: action.payload
                }
                case CLEAR_ERRORS:
                    return {
                        ...state,
                        error: null
                    }
                default:
                    return state
    }


}