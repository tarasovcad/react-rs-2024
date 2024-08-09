import { configureStore } from '@reduxjs/toolkit';
import selectedDataReducer from './slices/selectedDataSlice';
import { rickAndMortyApi } from '@/pages/api/rickAndMorti';


export const store = configureStore({
  reducer: {
    selectedData: selectedDataReducer,
    [rickAndMortyApi.reducerPath]: rickAndMortyApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rickAndMortyApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
