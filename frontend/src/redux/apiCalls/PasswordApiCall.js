import { passwordActions } from "../Slices/passwordSlice";
import request from "../../Utiles/Request";
import { toast } from "react-toastify";

export function forgetPassword(email) {
  return async () => {
    try {
      const { data } = await request.post("/api/password/reset-password-link", {
        email,
      });
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

export function resetPassword(token, id) {
  return async (dispatch) => {
    try {
      await request.get(`/api/password/reset-password/${id}/${token}`);
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(passwordActions.setError());
    }
  };
}

export function changePassword(newpassword,{id,token} ){ 
  return async () => {
    try {
      const { data } = await request.post(
        `/api/password/reset-password/${id}/${token}`,
        {
          password: newpassword,
        }
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
