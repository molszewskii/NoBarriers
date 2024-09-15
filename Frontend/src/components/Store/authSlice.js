import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userData: null,
    accessToken: '',
    userRole: '',
    isLoggedIn: false,
    error: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.userData = action.payload.userData;
      state.accessToken = action.payload.token;
      state.userRole = action.payload.userRole;
      state.isLoggedIn = true;
    },
    loginFailure: (state, action) => {
      state.error = action.payload.error;
    },
    logout: (state) => {
      state.userData = null;
      state.accessToken = '';
      state.userRole = '';
      state.isLoggedIn = false;
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;
