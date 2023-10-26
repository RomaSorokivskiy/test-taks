import { ADD_CRUD, DELETE_CRUD, FAIL_REQUEST, GET_CRUD_LIST, MAKE_REQUEST, UPDATE_CRUD } from "./ActionType"

const initialstate = {
    loading: true,
    crudList: [],
    errMessage: ''
}

export const Reducer = (state = initialstate, action:any) => {
    switch (action.type) {
        case MAKE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FAIL_REQUEST:
            return {
                ...state,
                loading: false,
                errMessage: action.payload
            }
        case GET_CRUD_LIST:
            return {
                loading: false,
                errMessage: '',
                crudList:action.payload,
            }
        case DELETE_CRUD:return{
            ...state,
            loading:false
        }
        case ADD_CRUD:return{
            ...state,
            loading:false
        }
        case UPDATE_CRUD:return{
            ...state,
            loading:false
        }
        default: return state
    }
}