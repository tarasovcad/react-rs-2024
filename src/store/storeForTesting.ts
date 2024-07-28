import {configureStore} from "@reduxjs/toolkit";

import {rickAndMortyApi} from "../api/fetchData";
import {setupListeners} from "@reduxjs/toolkit/query";

export const createTestStore = () => {
  const store = configureStore({
    reducer: {
      [rickAndMortyApi.reducerPath]: rickAndMortyApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(rickAndMortyApi.middleware),
  });
  setupListeners(store.dispatch);
  return store;
};
