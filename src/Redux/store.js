import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { contactReducer } from './Slices/contactSlice';
import { localStorageMiddleware } from './localStorageMiddleware'; // Twoja ścieżka do pliku z Middleware

const preloadedState = JSON.parse(localStorage.getItem('reduxState')) || {};

export const store = configureStore({
  reducer: {
    contact: contactReducer,
  },
  middleware: [...getDefaultMiddleware(), localStorageMiddleware],
  preloadedState,
});
