import { createSlice } from '@reduxjs/toolkit';

const user = localStorage.getItem('user');

// User slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: user && JSON.parse(user),
    authenticating: false,
  },
  reducers: {
    setUser: (state, action) => {
      // action.type, action.payload
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },

    setAuthenticating: (state, { payload }) => {
      state.authenticating = payload;
    },
  },
});

export const { setUser, setAuthenticating, logoutUser } = userSlice.actions;

export default userSlice.reducer;
