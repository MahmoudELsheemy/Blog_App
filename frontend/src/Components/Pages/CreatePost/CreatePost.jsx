import React from "react";
import "./createPost.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../../redux/apiCalls/PostApiCall";
import { RotatingLines } from "react-loader-spinner";
import { fetchCategories } from "../../../redux/apiCalls/CategoryApiCall";


const CreatePost = () => {
  const dispatch = useDispatch();
  const { isPostCreated, loading } = useSelector((state) => state.post);
  const { categories } = useSelector((state) => state.category);

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  //form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    //validation form

    if (title.trim() === "") {
      return toast.error("Please enter a title");
    }

    if (category.trim() === "") {
      return toast.error("Please enter a category");
    }

    if (description.trim() === "") {
      return toast.error("Please enter a description");
    }

    if (image === null) {
      return toast.error("Please select an image");
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);

    dispatch(createPost(formData));
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (isPostCreated) {
      setTitle("");
      setCategory("");
      setDescription("");
      setImage(null);
      navigate("/");
    }
  }, [isPostCreated, dispatch, navigate]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="createPost">
      <h1 className="createPost-title">Create Post</h1>
      <form onSubmit={handleSubmit} className="createPost-form">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
          className="createPost-input"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="createPost-select"
        >
          <option disabled value="">
            Select Category
          </option>
          {categories.map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="createPost-textarea"
          rows={5}
        />
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          name="file"
          className="createPost-upload"
          placeholder="Image"
          id="file"
        />
        <button className="createPost-button" type="submit">
          {loading ? (
            <RotatingLines
            visible={true}
            width="50"
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
          ) : (
            "Create Post"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
