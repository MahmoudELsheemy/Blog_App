import { createSlice } from "@reduxjs/toolkit";

const ProfileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
    loading: false,
    isProfileDeleted: false,
    userCount: 0,
    profiles:[],
  },
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setProfileImage: (state, action) => {
      state.profile.image = action.payload;
    },
    UpdateProfile: (state, action) => {
      state.profile = action.payload;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    unsetLoading: (state) => {
      state.loading = false;
    },
    setProfileDeleted: (state) => {
      state.isProfileDeleted = true;
      state.loading = false;
    },
    unsetProfileDeleted: (state) => {
      state.isProfileDeleted = false;
    },
    setUserCount: (state, action) => {
      state.userCount = action.payload;
    },
    setProfiles: (state, action) => {
      state.profiles = action.payload;
    },
  },
});

const profileReducer = ProfileSlice.reducer;
const profileActions = ProfileSlice.actions;

export { profileReducer, profileActions };
