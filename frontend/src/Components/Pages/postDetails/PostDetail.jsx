import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./post_deatails.css";
import { toast, ToastContainer } from "react-toastify/unstyled";
import Comment from "../../comments/Comment";
import CommentList from "../../comments/CommentList";
import Swal from "sweetalert2";
import UpdatePost from "./UpdatePost";
import { useDispatch, useSelector } from "react-redux";
import {
  getPostsByPage,
  toggleLike,
} from "../../../redux/apiCalls/PostApiCall";
import {
  updatePostImage,
  DeletePost,
} from "../../../redux/apiCalls/PostApiCall";
import { useNavigate } from "react-router-dom";

const PostDetail = () => {
  const { id } = useParams();
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getPostsByPage(id));
    window.scrollTo(0, 0);
  }, [id, dispatch]);

  ///////////////////////////
  const [image, setImage] = useState(null);
  const updateImage = (e) => {
    e.preventDefault();
    if (image === null) {
      return toast.error("Please select an image");
    }

    const formData = new FormData();
    formData.append("image", image);

    dispatch(updatePostImage(post?._id, formData));
  };

  const navigate = useNavigate();
  //delete post
  const deletePost = () => {
    Swal.fire({
      title: "Are you sure?",
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
          text: "Post has been deleted.",
          icon: "success",
        });
        dispatch(DeletePost(post?._id));
        navigate(`/profile/${post?.user?._id}`);
      }
    });
  };

  ////////////////////////
  const [like, setLike] = useState(false);
  const [likesCount, setLikesCount] = useState(post?.likes?.length || 0);

  useEffect(() => {
    if (Array.isArray(post?.likes) && post?.likes && user?._id) {
      setLike(post.likes.includes(user._id));
      setLikesCount(post.likes.length);
    }
  }, [post?.likes, user?._id]);

  const handleLike = () => {
    if (!user) return; // Ensure user is logged in
    // Optimistically update UI
    setLike((prevLiked) => !prevLiked);
    setLikesCount((prevCount) => (like ? prevCount - 1 : prevCount + 1));
    // Dispatch action to update backend
    dispatch(toggleLike(post._id));
  };

  return (
    <div className="postDetails">
      <ToastContainer position="top-center" theme="dark" />
      <div className="post-details-image-wrapper">
        <img
          src={image ? URL.createObjectURL(image) : post?.image?.url}
          alt=""
          className="post-details-image"
        />

        <div className="post-details-user">
          <img
            src={post?.user?.image?.url}
            alt=""
            className="post-details-user-image"
          />
          <div className="post-details-user-date">
            <strong>
              <Link
                to={`/profile/${post?.user?._id}`}
                className="post-details-user-link"
              >
                {post?.user?.name}
              </Link>
            </strong>
            <p>{new Date(post?.createdAt).toDateString()}</p>
          </div>
        </div>
      </div>
      {post?.user?._id === user?._id && (
        <form onSubmit={updateImage} className="post-update-details-form">
          <label htmlFor="file" className="post-update-details-label">
            <i className="bi bi-image-fill"></i>
            Select New Image
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="file"
            style={{ display: "none" }}
            className="post-update-details-input"
          />
          <button className="post-update-details-button">Update</button>
        </form>
      )}

      <div className="post-details-info-wrapper">
        <h2 className="post-details-title">{post?.title}</h2>

        <div className="container-description">
          <p className="post-deatails-description">
            {post?.description}
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur
            modi velit maxime quae repellat atque est expedita doloremque enim,
            ipsam cumque sed magnam fugiat repellendus nobis dolorum aliquid v
            el aperiam. Lorem ipsum dolor, sit amet consectetur adipisicing
            elit. Eligendi, impedit! Harum quo voluptatum repudiandae placeat,
            ut minima neque, aliquid cupiditate mollitia, nemo molestiae
            voluptas pariatur dolorum repellendus. Blanditiis, quibusdam error!
          </p>
        </div>
        <div className="post-deatails-icon">
          <div>
            {user && (
              <i
                onClick={handleLike}
                className={`bi ${like ? "bi-heart-fill red" : "bi-heart"}`}
              ></i>
            )}
            <small>{likesCount} Likes</small>
          </div>

          {post?.user?._id === user?._id && (
            <div>
              <i
                onClick={() => setShowUpdateForm(true)}
                className="bi bi-pencil-square"
              ></i>
              <i onClick={deletePost} className="bi bi-trash"></i>
            </div>
          )}
        </div>
        {user ? (
          <Comment postId={post?._id} />
        ) : (
          <p className="post-deatails-comment-error">
            To write a comment you must be logged in
          </p>
        )}

        <CommentList comments={post?.comments} />
        {showUpdateForm && (
          <UpdatePost post={post} setShowUpdateForm={setShowUpdateForm} />
        )}
      </div>
    </div>
  );
};
export default PostDetail;
