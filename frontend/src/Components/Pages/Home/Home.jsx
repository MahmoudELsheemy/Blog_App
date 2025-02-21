import React from "react";
import "./home.css";
import PostList from "../../Posts/PostList";
import Sidebar from "../../sidebar/Sidebar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPosts } from "../../../redux/apiCalls/PostApiCall";

const Home = () => {
  const dispatch = useDispatch();

  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPosts(1));
    window.scrollTo(0, 0);
  }, [dispatch]);

  return (
    <div className="home">
      <div className="home-hero-header">
        <div className="home-hero-layout">
          <h1> Welcome to Blog</h1>
        </div>
      </div>

      <div className="home-post-title"> Latest Posts </div>
      <div className="home-container">
        <PostList posts={posts} />
        <Sidebar />
      </div>
      <div className="home-see-posts">
        <Link className="home-see-posts-link" to="/posts">
          See all posts
        </Link>
      </div>
    </div>
  );
};

export default Home;
