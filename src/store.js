import { configureStore } from "@reduxjs/toolkit";
import { api } from './api'; // Import the api from api.js

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;