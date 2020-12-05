import { createSlice } from '@reduxjs/toolkit';

// transaction slice
const transactionSlice = createSlice({
  name: 'transaction',
  initialState: {
    transactions: [],
    selectedTransaction: null,
    transactionAdding: false,
    transactionLoading: false,
  },
  reducers: {
    setTransactions: (state, { payload }) => {
      state.transactions = payload;
    },
    setSelectedTransaction: (state, { payload }) => {
      state.selectedTransaction = payload;
    },
    setTransactionAdding: (state, { payload }) => {
      state.transactionAdding = payload;
    },
    setTransactionLoading: (state, { payload }) => {
      state.transactionLoading = payload;
    },
  },
});

export const {
  setTransactions,
  setSelectedTransaction,
  setTransactionAdding,
  setTransactionLoading,
} = transactionSlice.actions;

export default transactionSlice.reducer;
