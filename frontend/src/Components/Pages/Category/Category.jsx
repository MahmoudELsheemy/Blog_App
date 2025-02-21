import React, { useEffect } from "react";
import "./Category.css";
import { useParams, Link } from "react-router-dom";
import PostList from "../../Posts/PostList";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryPosts } from "../../../redux/apiCalls/PostApiCall";
//import { posts } from "../../../dummyData";

const Category = () => {
  const dispatch = useDispatch();
  const { postCate } = useSelector((state) => state.post);

  const { category } = useParams();

  useEffect(() => {
    dispatch(getCategoryPosts(category));
    window.scrollTo(0, 0);
  }, [category, dispatch]);

  return (
    <div className="Category">
      {postCate.length === 0 ? (
        <div className="title">
          <h3> No Post Found</h3>
        </div>
      ) : (
        ""
      )}
      {postCate.length === 0 ? (
        <Link to="/posts" className="notfound-category">
          Go to posts
        </Link>
      ) : (
        ""
      )}
      <div className="title">
        <h1> Posts based on {category}</h1>
      </div>
      <PostList posts={Array.isArray(postCate) ? postCate : []} />
    </div>
  );
};

export default Category;
