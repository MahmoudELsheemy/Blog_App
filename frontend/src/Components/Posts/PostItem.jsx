import React from "react";
import { Link } from "react-router-dom";
import "./post.css";

const PostItem = ({ post,name,id}) => {
  const profileLink = id? `/profile/${post?.user?._id}` : `/profile/${post?.user?._id}` 
  return (
    <div className="postItem">
      <div className="postItem-image-container">
        <img src={post.image.url} alt="" className="postItem-image" />
      </div>
      <div className="post-item-info-weapper">
        <div className="post-item-info">
          <div className="post-item-author">
            <strong>Author:  </strong>
            <Link className="post-item-link" to={profileLink}>{name ? name : post?.user.name} </Link>
          </div>
          <div className="post-item-date">
            {new Date(post?.createdAt).toDateString()}
          </div>
        </div>

        <div className="post-item-Details">
          <h4 className="post-item-title">{post?.title}</h4>
          <Link
            to={`/posts/categories/${post?.category}`}
            className="post-item-category"
          >
            {post?.category}
          </Link>
        </div>
        <p className="post-item-description">
          {post?.description}
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum quas
          eos accusamus sunt iure asperiores modi quisquam fugit exercitationem
          facere provident officia quasi,  odit nam quaerat dolorem minus ad
          veritatis.
        </p>
        <Link to={`/posts/details/${post?._id}`} className="post-item-more">
            Read More
          </Link>
      </div>
    </div>
  );
};

export default PostItem;
