import React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../../redux/apiCalls/CategoryApiCall";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
    <div className="sidebar">
      <h4>Categories</h4>
      <ul className="sidebar-list">
        {categories.map((category) => (
          <Link
            key={category._id}
            className="sidebar-link"
            to={`/posts/categories/${category.name}`}
          >
            {category.name}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
