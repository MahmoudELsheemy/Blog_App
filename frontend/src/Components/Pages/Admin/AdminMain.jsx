import React, { useEffect } from "react";
import "./Admin.css";
import { Link } from "react-router-dom";
import AddCategory from "./AddCategory";
import { fetchCategories } from "../../../redux/apiCalls/CategoryApiCall";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountUsers } from "../../../redux/apiCalls/ProfileApiCall";
import { getPostsCount } from "../../../redux/apiCalls/PostApiCall";
import { fetshAllComment } from "../../../redux/apiCalls/CommentApiCall";
const AdminMain = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { userCount } = useSelector((state) => state.profile);
  const { postCount } = useSelector((state) => state.post);
  const {comments} = useSelector((state) => state.comment);
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchCountUsers());
    dispatch(getPostsCount());
    dispatch(fetshAllComment());
  }, [dispatch]);

  return (
    <div className="adminMain">
      <div className="adminMain-header">
        <div className="admin-card">
          <h4 className="admin-title">
            <i className="bi bi-people"></i>
            Users
          </h4>
          <span className="admin-count">{userCount}</span>
          <div className="admin-card-link-wrapper">
            <Link to="/admin/users" className="admin-card-link">
              View All Users
            </Link>
            <div className="admin-card-icon">
              <i className="bi bi-person-lines-fill"></i>
            </div>
          </div>
        </div>
        <div className="admin-card">
          <h4 className="admin-title">
            <i className="bi bi-stickies"></i>
            Posts
          </h4>
          <span className="admin-count">{postCount}</span>
          <div className="admin-card-link-wrapper">
            <Link to="/admin/posts" className="admin-card-link">
              See All Posts
            </Link>
            <div className="admin-card-icon">
              <i className="bi bi-journal-text"></i>
            </div>
          </div>
        </div>
        <div className="admin-card">
          <h4 className="admin-title">
            <i className="bi bi-tag-fill"></i>
            Categories
          </h4>
          <span className="admin-count">{categories.length}</span>
          <div className="admin-card-link-wrapper">
            <Link to="/admin/categories" className="admin-card-link">
              See All Categories
            </Link>
            <div className="admin-card-icon">
              <i className="bi bi-tags-fill"></i>
            </div>
          </div>
        </div>
        <div className="admin-card">
          <h4 className="admin-title">
            <i className="bi bi-chat-left-text"></i>
            Comments
          </h4>
          <span className="admin-count">{comments.length}</span>
          <div className="admin-card-link-wrapper">
            <Link to="/admin/comments" className="admin-card-link">
              See All Comments
            </Link>
            <div className="admin-card-icon">
              <i className="bi bi-chat-left-dots-fill"></i>
            </div>
          </div>
        </div>
      </div>
      <AddCategory />
    </div>
  );
};

export default AdminMain;
