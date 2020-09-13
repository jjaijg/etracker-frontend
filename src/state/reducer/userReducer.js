import { createSlice } from '@reduxjs/toolkit';

// User slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    token: null,
    message: '',
    success: false,
    authenticating: false,
  },
  reducers: {
    setUser: (state, action) => {
      // action.type, action.payload
      console.log('Action : ', action);
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setToken: (state, { payload }) => {
      state.token = payload.token;
    },
    setAuthenticationStatus: (state, { payload }) => {
      state.success = payload.success;
      state.message = payload.message;
    },
    setAuthenticating: (state, { payload }) => {
      state.authenticating = payload;
    },
  },
});

export const {
  setUser,
  setToken,
  setAuthenticationStatus,
  setAuthenticating,
} = userSlice.actions;

export default userSlice.reducer;
