import { createSlice } from "@reduxjs/toolkit";
const PostSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    postCount: 0,
    postCate: {},
    loading: false,
    isPostCreated: false,
    post: null,
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setPostCount: (state, action) => {
      state.postCount = action.payload;
    },
    setPostCategory: (state, action) => {
      state.postCate = action.payload;
    },
    SetCreatePost: (state) => {
      state.isPostCreated = true;
      state.loading = false;
    },
    unsetPostCreated: (state) => {
      state.isPostCreated = false;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    unsetLoading: (state) => {
      state.loading = false;
    },
    setPostDetails: (state, action) => {
      state.post = action.payload;
    },
    setLike: (state, action) => {
      state.post.likes = action.payload;
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
    addComment: (state, action) => {
      state.post.comments.push(action.payload);
    },
    setUpdateComment: (state, action) => {
      state.post.comments = state.post.comments.map((comment) => {
        if (comment._id === action.payload._id) {
          return action.payload;
        }
        return comment;
      })
    },
    setDeleteComment: (state, action) => {
      state.post.comments = state.post.comments.filter(
        (comment) => comment._id !== action.payload
      );
    },
  },
});


const postReducer = PostSlice.reducer;
const postActions = PostSlice.actions;

export { postReducer, postActions };
