import { configureStore } from "@reduxjs/toolkit";
import itemsReducer  from "../reducers/todoSlice.js";


export const store = configureStore({
    reducer:{
        items:itemsReducer
    }
})