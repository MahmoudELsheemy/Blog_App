import React from "react";
import "./comment.css";
import { toast } from "react-toastify";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createComment } from "../../redux/apiCalls/CommentApiCall";

const Comment = ({ postId }) => {
  const [content, setComment] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() === "") {
      return toast.error("Please enter a comment");
    }
    dispatch(createComment({content, postId }));

    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} className="comment">
      <div className="comment-input">
        <input
          type="text"
          placeholder="Type your comment"
          value={content}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <div className="comment-button">
        <button type="submit">Send</button>
      </div>
    </form>
  );
};

export default Comment;
