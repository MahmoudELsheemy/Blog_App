import { createSlice } from "@reduxjs/toolkit";

const passwordSlice = createSlice({
  name: "password",
  initialState: {
    isErorr: false,
  },
  reducers: {
    setError: (state ) => {
      state.isErorr = true
    },

  },
});

const passwordReducer = passwordSlice.reducer;
const passwordActions = passwordSlice.actions;

export { passwordReducer, passwordActions };
