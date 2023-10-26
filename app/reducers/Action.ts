import axios from "axios"
import { ADD_CRUD, DELETE_CRUD, FAIL_REQUEST, GET_CRUD_LIST, MAKE_REQUEST, UPDATE_CRUD } from "./ActionType"
import routesAPI from "app/app/const/routes_api";
import {toast} from "react-toastify";

export const makeRequest=()=>{
    return{
        type:MAKE_REQUEST
    }
}
export const failRequest=(err:any)=>{
    return{
        type:FAIL_REQUEST,
        payload:err
    }
}
export const getCrudList=(data:any)=>{
    return{
        type:GET_CRUD_LIST,
        payload:data
    }
}
export const deleteCrud=()=>{
    return{
        type:DELETE_CRUD
    }
}
export const addCrud=()=>{
    return{
        type:ADD_CRUD
    }
}
export const updateCrud=()=>{
    return{
        type:UPDATE_CRUD
    }
}



export const FetchCrudList=(limit:number = 10)=>{
    return (dispatch:any)=>{
        dispatch(makeRequest());
        axios.get(`${routesAPI.ROUTE}${routesAPI.TABLE}?limit=${limit}&offset=10`).then(res=>{
            const crudList = res.data;
            dispatch(getCrudList(crudList));
        }).catch(err=>{
            dispatch(failRequest(err.message))
        })
    }
}

export const RemoveCrud=(id:number)=>{
    return (dispatch:any)=>{
        dispatch(makeRequest());
        //setTimeout(() => {
        axios.delete(`${routesAPI.ROUTE}${routesAPI.TABLE}${id}/`).then(res=>{
            dispatch(deleteCrud());
        }).catch(err=>{
            dispatch(failRequest(err.message))
        })
        // }, 2000);

    }
}

export const FunctionAddCrud=(data:any)=>{
    return (dispatch:any)=>{
        dispatch(makeRequest());
        //setTimeout(() => {
        axios.post(`${routesAPI.ROUTE}${routesAPI.TABLE}`,data).then(res=>{
            dispatch(addCrud());
            toast.success('Todo Added successfully.')
        }).catch(err=>{
            dispatch(failRequest(err.message))
        })
        // }, 2000);

    }
}

export const FunctionUpdateCrud=(id:number,data:any)=>{
    return (dispatch:any)=>{
        dispatch(makeRequest());
        //setTimeout(() => {
        axios.put(`${routesAPI.ROUTE}${routesAPI.TABLE}${id}/`,data).then(res=>{
            dispatch(updateCrud());
            toast.success('Todo Updated successfully.')
        }).catch(err=>{
            dispatch(failRequest(err.message))
        })
        // }, 2000);

    }
}