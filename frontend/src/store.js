import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { apiSlice } from "./slices/apiSlice";
import { cartSliceReducer } from "./slices/cartSlice";
import { authSliceReducer } from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart:cartSliceReducer,
    auth:authSliceReducer
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});
