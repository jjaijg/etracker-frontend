import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = { type: null, message: null };

// Message slice
const messageSlice = createSlice({
  name: 'message',
  initialState: {
    ...INITIAL_STATE,
  },
  reducers: {
    setSuccessMessage: (state, { payload }) => {
      state.type = 'alert-success';
      state.message = payload.message;
    },
    setFailMessage: (state, { payload }) => {
      state.type = 'alert-fail';
      state.message = payload.message;
    },
    removeMessage: (state) => {
      state.type = null;
      state.message = null;
    },
  },
});

export const {
  setSuccessMessage,
  setFailMessage,
  removeMessage,
} = messageSlice.actions;

export default messageSlice.reducer;
