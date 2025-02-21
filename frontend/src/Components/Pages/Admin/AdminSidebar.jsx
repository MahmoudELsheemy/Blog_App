import React from "react";
import "./Admin.css";
import { Link } from "react-router-dom";
const AdminSidebar = () => {
  return <div className="adminSidebar">
    <Link className="adminSidebar-title" to="/admin">
    <i className="bi bi-columns-gap"></i>
     Dashboard
    </Link>
    <ul className="adminSidebar-list">
      <Link className="adminSidebar-link" to="/admin/users">
        <i className="bi bi-people"></i>
        Users
      </Link>
      <Link className="adminSidebar-link" to="/admin/posts">
        <i className="bi bi-stickies"></i>
        Posts
      </Link>
      <Link className="adminSidebar-link" to="/admin/categories">
        <i className="bi bi-tag-fill"></i>
        Categories
      </Link>
      <Link className="adminSidebar-link" to="/admin/comments">
        <i className="bi bi-chat-left-text"></i>
        Comments
      </Link>


    </ul>
  </div>;
};

export default AdminSidebar;
