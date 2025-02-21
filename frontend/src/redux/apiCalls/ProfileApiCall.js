import { profileActions } from "../Slices/ProfileSlice";
import request from "../../Utiles/Request";
import { toast } from "react-toastify";
import { authActions } from "../Slices/AuthSlice";

export function getProfile(user_id) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/users/profile/${user_id}`);
      dispatch(profileActions.setProfile(data.user));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

export function uploadImage(newImage) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(
        "/api/users/profile/photo",
        newImage,
        {
          headers: {
            Authorization: `Bearer ${getState().auth.user.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(profileActions.setProfileImage(data.image));
      dispatch(authActions.setUserPhoto(data.image));
      toast.success(data.message);
      //mod the user in the local storage
      const user = JSON.parse(localStorage.getItem("user"));
      user.image = data?.image;
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

export function updateProfile(id, profile) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(`/api/users/profile/${id}`, profile, {
        headers: {
          Authorization: `Bearer ${getState().auth.user.token}`,
        },
      });
      dispatch(profileActions.UpdateProfile(data));
      const user = JSON.parse(localStorage.getItem("user"));
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

export function deleteProfile(id) {
  return async (dispatch, getState) => {
    try {
      dispatch(profileActions.setLoading());
      const { data } = await request.delete(`/api/users/profile/${id}`, {
        headers: {
          Authorization: `Bearer ${getState().auth.user.token}`,
        },
      });
      dispatch(profileActions.setProfileDeleted());
      toast.success(data?.message);
      setTimeout(() => dispatch(profileActions.unsetProfileDeleted()), 2000);
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(profileActions.unsetLoading());
    }
  };
}

export function fetchCountUsers() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get("/api/users/count", {
        headers: {
          Authorization: `Bearer ${getState().auth.user.token}`,
        },
      })
      dispatch(profileActions.setUserCount(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}


export function getProfiles() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get("/api/users/profile", {
        headers: {
          Authorization: `Bearer ${getState().auth.user.token}`,
        },
      })
      dispatch(profileActions.setProfiles(data));
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
