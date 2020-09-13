import { createSlice } from '@reduxjs/toolkit';

// User slice
const expenseSlice = createSlice({
  name: 'expense',
  initialState: {
    expenses: [],
    success: false,
    message: '',
    expensesLoading: false,
  },
  reducers: {
    setExpensess: (state, { payload }) => {
      state.expenses = payload;
    },
    setExpensesStatus: (state, { payload }) => {
      state.success = payload.success;
      state.message = payload.message;
    },
    setExpensesLoading: (state, { payload }) => {
      state.expensesLoading = payload;
    },
  },
});

export const {
  setExpensess,
  setExpensesStatus,
  setExpensesLoading,
} = expenseSlice.actions;

export default expenseSlice.reducer;
