import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    registerMessage: null,
    isEmailVertified: false,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.registerMessage = null;
    },
    logout: (state) => {
      state.user = null;
    },
    register: (state, action) => {
      state.registerMessage = action.payload;
    },
    setUserPhoto: (state, action) => {
      state.user.image = action.payload;
    },
    setIsEmailVertified: (state) => {
      state.isEmailVertified =true
      state.registerMessage = null
    },
  },
});

const authReducer = AuthSlice.reducer;
const authActions = AuthSlice.actions;

export { authReducer, authActions };
