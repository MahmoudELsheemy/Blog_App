import { postActions } from "../Slices/PostSlice";
import request from "../../Utiles/Request";
import { toast } from "react-toastify";

export function getPosts(page) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts?page=${page}`);
      dispatch(postActions.setPosts(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
export function getAllPosts() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts`);
      dispatch(postActions.setPosts(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

export function getPostsCount() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts/count`);
      dispatch(postActions.setPostCount(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

export function getCategoryPosts(category) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts?category=${category}`);
      dispatch(postActions.setPostCategory(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

export function createPost(newPost) {
  return async (dispatch, getState) => {
    try {
      dispatch(postActions.setLoading());
      await request.post("/api/posts", newPost, {
        headers: {
          Authorization: `Bearer ${getState().auth.user.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(postActions.SetCreatePost());
      setTimeout(() => dispatch(postActions.unsetPostCreated()), 3000);
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(postActions.unsetLoading());
    }
  };
}

export function getPostsByPage(_id) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts/${_id}`);
      dispatch(postActions.setPostDetails(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

export function toggleLike(postId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/posts/like/${postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getState().auth.user.token}`,
          },
        }
      );
      dispatch(postActions.setLike(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

export function updatePostImage(postId, newImage) {
  return async (dispatch, getState) => {
    try {
      await request.put(`/api/posts/updateImage/${postId}`, newImage, {
        headers: {
          Authorization: `Bearer ${getState().auth.user.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("image updated successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

export function updatePost(postId, newPost) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(`/api/posts/${postId}`, newPost, {
        headers: {
          Authorization: `Bearer ${getState().auth.user.token}`,
        },
      });
      dispatch(postActions.setPostDetails(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}


export function DeletePost(postId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${getState().auth.user.token}`,
        },
      });
      dispatch(postActions.deletePost(data.postId));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
