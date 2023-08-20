import { configureStore } from "@reduxjs/toolkit";
import  stock  from './stockSlice';
import filters from "./filterSlice";
import filterStock from "./allProductsStockSlice"
import { apiSlice } from "./ApiSlice";

const {reducerPath,reducer, middleware} = apiSlice;

const store = configureStore({
    reducer: {stock,filters,filterStock,
        [reducerPath]: reducer},
    middleware: getDefaultMiddlewere => getDefaultMiddlewere().concat(middleware),
    devTools: process.env.NODE_ENV !=='production'
})

export default store;