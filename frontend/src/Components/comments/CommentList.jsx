import React from "react";
import "./commentList.css";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import UpdateComment from "./UpdateComment";
import { useState } from "react";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import { deleteeComment } from "../../redux/apiCalls/CommentApiCall";

const CommentList = ({ comments }) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [commentUpdate, setCommentUpdate] = useState(null);

  const dispatch = useDispatch();
  const updateComment = (comment) => {
    setShowUpdateForm(true);
    setCommentUpdate(comment);
  }
  const deleteComment = (commentId) => {
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
        dispatch(deleteeComment(commentId));
        Swal.fire({
          title: "Deleted!",
          text: "Comment has been deleted.",
          icon: "success",
        });
      } 
    });
  };
  const { user } = useSelector((state) => state.auth);

  if (!Array.isArray(comments)) {
    return <p>No posts available</p>;
  }


  return (
    <div className="comment-list">
      <h4 className="comment-list-count">{comments?.length} Comments </h4>
      {comments.map((comment) => (
        <div key={comment._id} className="comment-item">
          <div className="comment-item-info">
            <div className="comment-item-user-info">
              <img
                src="/images/user-avatar.png"
                alt=""
                className="comment-item-user-photo"
              />
              <span className="comment-item-username">{comment?.name}</span>
            </div>
            <div className="comment-item-time">
              <Moment fromNow ago>
                {comment?.createdAt}
                </Moment>
              {" "} ago
            </div>
          </div>
          <p className="comment-item-text">{comment?.content}</p>
          {
            comment?.user=== user?._id && (
              <div className="comment-item-icon-wrapper">
                <i
                  onClick={() => updateComment(comment)}
                  className="bi bi-pencil-square"
                ></i>
                <i onClick={() => deleteComment(comment?._id)} className="bi bi-trash-fill"></i>
              </div>
            )
          }
        </div>
      ))}
      {showUpdateForm && (
        <UpdateComment setShowUpdateComment={setShowUpdateForm} commentUpdated={commentUpdate} />
      )}
    </div>
  );
};

export default CommentList;
