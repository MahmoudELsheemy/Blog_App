import { authActions } from "../Slices/AuthSlice";
import request from "../../Utiles/Request";
import { toast } from "react-toastify";

export function login(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/login", user);
      dispatch(authActions.login(data));
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

export function logout() {
  return (dispatch) => {
    dispatch(authActions.logout());
    localStorage.removeItem("user");
  };
}

export function register(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/register", user);
      dispatch(authActions.register(data.message));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

export function vertifyEmail(id, token) {
  return async (dispatch) => {
    try {
       await request.get( `/api/auth/${id}/vertify/${token}`);
      dispatch(authActions.setIsEmailVertified());
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}


// const response = fetch("http://localhost:5000/api/auth/login", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(user),
// });
// response.then((res) => {
//   if (res.ok) {
//     res.json().then((data) => {
//       dispatch(authActions.login(data));
//       localStorage.setItem("user", JSON.stringify(data));
//     });
//   }
