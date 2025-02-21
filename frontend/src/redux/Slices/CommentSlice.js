import { createSlice } from "@reduxjs/toolkit";

const CommentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: [],
  },
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    setDeleteComment: (state, action) => {
      state.comments = state.comments.filter(
        (comment) => comment._id !== action.payload
      );
    },
  },
});

const commentReducer = CommentSlice.reducer;
const commentActions = CommentSlice.actions;
export { commentReducer, commentActions };
