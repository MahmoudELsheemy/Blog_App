import React, { useEffect, useState } from "react";
import "./Profile.css";
import { toast } from "react-toastify";
import UpdateProfile from "./UpdateProfile";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../../redux/apiCalls/ProfileApiCall";
import { useParams, useNavigate } from "react-router-dom";
import {
  uploadImage,
  deleteProfile,
} from "../../../redux/apiCalls/ProfileApiCall";
import PostItem from "../../Posts/PostItem";
import { Oval } from "react-loader-spinner";
import { logout } from "../../../redux/apiCalls/AuthApiCall";
const Profile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getProfile(id));
    window.scrollTo(0, 0);
    return () => window.scrollTo(0, 0);
  }, [id, dispatch]);

  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [image, setImage] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
    if (image === null) {
      return toast.error("Please select an image");
    }

    const formData = new FormData();
    formData.append("image", image);

    dispatch(uploadImage(formData));
  };

  const { profile, loading, isProfileDeleted } = useSelector(
    (state) => state.profile
  );
  const navigate = useNavigate();
  //DELETE Acount and logout
  const deleteAccount = () => {
    Swal.fire({
      title: "Are you sure to delete your account?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your account has been deleted.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });
        dispatch(deleteProfile(user?._id));
        dispatch(logout());
      }
    });
  };

  useEffect(() => {
    if (isProfileDeleted) {
      navigate("/");
    }
  }, [isProfileDeleted, navigate]);

  if (loading) {
    return (
      <div className="loader">
        <Oval
          visible={true}
          height="120"
          width="120"
          color="#000"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
          strokeWidth={3}
          strokeWidthSecondary={3}
        />
      </div>
    );
  }

  return (
    <div className="prfile">
      <div className="header-profile">
        <div className="image-wrapper">
          <img
            className="profile-image"
            src={
              image
                ? URL.createObjectURL(image)
                : profile?.image?.url || "../../../images/profile.jpg"
            }
            alt="profile"
          />
          {user?._id === profile?._id && (
            <form onSubmit={submitHandler} className="form">
              <abbr title="choose image">
                <label
                  htmlFor="image"
                  className="bi bi-camera-fill camera"
                ></label>
              </abbr>
              <input
                hidden
                type="file"
                name="image"
                id="image"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <button type="submit">Update</button>
            </form>
          )}
        </div>

        <h1 className="profile-username"> {profile?.name}</h1>
        <p className="profile-description">{profile?.bio}</p>
        <div className="use-data-join">
          <strong>Joined:</strong>{" "}
          {new Date(profile?.createdAt).toDateString() || "Loading..."}
        </div>
        {user?._id === profile?._id && (
          <button onClick={() => setShowUpdateForm(true)} className="update">
            <i className="bi bi-file-person-fill update-icon"></i>
            Update Profile
          </button>
        )}

        {showUpdateForm && (
          <UpdateProfile
            setShowUpdateForm={setShowUpdateForm}
            profile={profile}
          />
        )}
      </div>

      <div className="profile-posts">
        <h2 className="profile-posts-title"> {profile?.name} Posts </h2>
        {profile?.posts?.map((post) => (
          <PostItem
            post={post}
            key={post._id}
            name={profile?.name}
            id={profile?._id}
          />
        ))}
      </div>
      {user?._id === profile?._id && (
        <button onClick={deleteAccount} className="logout">
          Delete Account <i className="bi bi-box-arrow-right"></i>
        </button>
      )}
    </div>
  );
};

export default Profile;
