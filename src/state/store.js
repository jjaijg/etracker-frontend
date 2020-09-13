import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import userReducer from './reducer/userReducer';
import expenseReducer from './reducer/expenseReducer';

const reducers = {
  user: userReducer,
  expense: expenseReducer,
  // bill: billReducer,
};

export default configureStore({
  reducer: reducers,
  middleware: [...getDefaultMiddleware(), logger],
  devTools: process.env.NODE_ENV !== 'production',
});
