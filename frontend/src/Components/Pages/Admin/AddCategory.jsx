import React from "react";
import "./AddCategory.css";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch} from "react-redux";
import { createCategories } from "../../../redux/apiCalls/CategoryApiCall";
const AddCategory = () => {
  const dispatch = useDispatch();
  const [name, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      return toast.error("Please enter a title");
    }
    dispatch(createCategories({ name }));
    setTitle("");
  };

  return (
    <div className="addCategory">
      <ToastContainer position="top-center" theme="dark" />
      <h5 className="add-category-title">Add Category</h5>
      <form onSubmit={handleSubmit} className="add-category">
        <div className="add-category-group">
          <label className="add-category-label">Category Name</label>
          <input
            type="text"
            id="title"
            placeholder="Enter Category Name"
            className="add-category-input"
            value={name}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <button type="submit" className="add-category-btn">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
