import { configureStore } from '@reduxjs/toolkit';
import thunk from "redux-thunk";
import logger from 'redux-logger';
import rootReducer from './reducers';

const middleware = (getDefaultMiddleware: any) => {
  const middlewares: any[] = [thunk];

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
  }

  return getDefaultMiddleware({
    serializableCheck: false, // Disable the serializableCheck middleware for simplicity
  }).concat(middlewares);
};


const store = configureStore({
  reducer: rootReducer,
  middleware
});

export default store;