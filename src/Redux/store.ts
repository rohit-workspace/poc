import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./Reducers/ProductSlice";
import editSlice from "./Reducers/EditProductSlice";

export const store = configureStore({
  reducer: {
    productReducer: ProductSlice,
    formReducer: editSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
