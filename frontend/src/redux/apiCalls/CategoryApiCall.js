import { categoryActions } from "../Slices/CategorySlice";
import request from "../../Utiles/Request";
import { toast } from "react-toastify";

export function fetchCategories() {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/categories");
      dispatch(categoryActions.setCategories(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

export function createCategories(newCategory) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post("/api/categories", newCategory, {
        headers: {
          Authorization: `Bearer ${getState().auth.user.token}`,
        },
      });
      dispatch(categoryActions.setAddCategory(data));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

export function deleteCategories(id) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${getState().auth.user.token}`,
        },
      });
      dispatch(categoryActions.setDeleteCategory(data.categoryId));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
