import React from "react";
import "./UpdatePost.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../../redux/apiCalls/PostApiCall";
import { useEffect } from "react";
import { fetchCategories } from "../../../redux/apiCalls/CategoryApiCall";

const UpdatePost = ({ setShowUpdateForm, post }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  const [title, setTitle] = useState(post.title);
  const [category, setCategory] = useState(post.category);
  const [description, setDescription] = useState(post.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      return toast.error("Please enter a title");
    }

    if (category.trim() === "") {
      return toast.error("Please enter a category");
    }

    if (description.trim() === "") {
      return toast.error("Please enter a description");
    }
    const updatedPost = { title, category, description };

    dispatch(updatePost(post?._id, updatedPost));
    setShowUpdateForm(false);
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="updatePost">
      <form onSubmit={handleSubmit} className="update-form">
        <abbr title="Close">
          <i
            onClick={() => setShowUpdateForm(false)}
            className="bi bi-x-circle-fill update-close"
          ></i>
        </abbr>
        <h4 className="update-form-title">Update Post</h4>
        <div className="update-form-input">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <select
          className="update-form-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option disabled value="">
            Select category
          </option>
          {categories.map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <div className="update-form-input">
          <textarea
            name=""
            id=""
            cols="30"
            rows="5"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="update-form-button">
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePost;
