import { configureStore,combineReducers } from "@reduxjs/toolkit";
import { Reducer } from "./Reducer";

const rootreducer=combineReducers({crud:Reducer});
const Store=configureStore({reducer:rootreducer,})
export default Store;