import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./Reducers/ProductSlice";

export const store = configureStore({
  reducer: {
    productReducer: ProductSlice, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
