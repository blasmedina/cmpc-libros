import { configureStore } from "@reduxjs/toolkit";
import librosReducer from "./slices/librosSlice";

export const store = configureStore({
  reducer: {
    libros: librosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
