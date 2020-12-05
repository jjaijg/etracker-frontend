import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import userReducer from './reducer/userReducer';
import txnReducer from './reducer/transactionReducer';
import categoryReducer from './reducer/categoryReducer';
import messageReducer from './reducer/messageReducer';

const reducers = {
  user: userReducer,
  transaction: txnReducer,
  category: categoryReducer,
  message: messageReducer,
};

const MIDDLEWARES = process.env.NODE_ENV === 'production' ? [] : [logger];

export default configureStore({
  reducer: reducers,
  middleware: [...getDefaultMiddleware(), ...MIDDLEWARES],
  devTools: process.env.NODE_ENV !== 'production',
});
