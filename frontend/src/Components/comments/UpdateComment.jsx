import React from "react";
import "./Updatecomment.css";
import { toast } from "react-toastify";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateComment } from "../../redux/apiCalls/CommentApiCall";
const UpdateComment = ({ setShowUpdateComment, commentUpdated }) => {
  const [content, setComment] = useState(commentUpdated?.content);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() === "") {
      return toast.error("Please enter a comment");
    }

    dispatch(updateComment({ content }, commentUpdated?._id));
    setComment("");
    setShowUpdateComment(false);
  };
  return (
    <div className="UpdateComment">
      <form onSubmit={handleSubmit} className="update-comment-form">
        <abbr title="Close" onClick={() => setShowUpdateComment(false)}>
          <i className="bi bi-x-circle-fill update-comment-close"></i>
        </abbr>
        <h4>Update Comment</h4>
        <input
          type="text"
          placeholder="Type your comment"
          value={content}
          onChange={(e) => setComment(e.target.value)}
        />
        <button className="update-comment-button" type="submit">
          Update Comment
        </button>
      </form>
    </div>
  );
};

export default UpdateComment;
