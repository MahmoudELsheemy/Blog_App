import { postActions } from "../Slices/PostSlice";
import { commentActions } from "../Slices/CommentSlice";
import request from "../../Utiles/Request";
import { toast } from "react-toastify";

export function createComment(newcomment) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post("/api/comments", newcomment, {
        headers: {
          Authorization: `Bearer ${getState().auth.user.token}`,
        },
      });
      dispatch(postActions.addComment(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

export function updateComment(newcomment, id) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(`/api/comments/${id}`, newcomment, {
        headers: {
          Authorization: `Bearer ${getState().auth.user.token}`,
        },
      });
      dispatch(postActions.setUpdateComment(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

export function deleteeComment(id) {
  return async (dispatch, getState) => {
    try {
      await request.delete(`/api/comments/${id}`, {
        headers: {
          Authorization: `Bearer ${getState().auth.user.token}`,
        },
      });
      dispatch(commentActions.setDeleteComment(id));
      dispatch(postActions.setDeleteComment(id));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

export function fetshAllComment() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/comments/`, {
        headers: {
          Authorization: `Bearer ${getState().auth.user.token}`,
        },
      });
      dispatch(commentActions.setComments(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
