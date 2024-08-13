import {configureStore} from "@reduxjs/toolkit";
import selectedDataReducer from "./slices/selectedDataSlice";

export const store = configureStore({
  reducer: {
    selectedData: selectedDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
