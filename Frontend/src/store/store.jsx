import {configureStore} from "@reduxjs/toolkit"
import userSlice from "../reducers/userSlice"
import productSlice from "../reducers/productSlice"
import cardSlice from "../reducers/cardSlice"

export const store = configureStore({

    reducer:{
        userReducer:userSlice,
        productReducer:productSlice ,
        cardReducer:cardSlice,
        
    }
})