import React from "react";
import PostItem from "./PostItem";
import "./post.css";

const PostList = ({ posts }) => {
    if (!Array.isArray(posts)) {
      console.error("Expected an array, but got:", posts); // Debugging
      return <p>No posts available</p>;
    }
  return (
    <div className="postList">
      {posts.map((item) => (
        <PostItem post={item} key={item._id} />
      ))}
    </div>
  );
};


export default PostList;
