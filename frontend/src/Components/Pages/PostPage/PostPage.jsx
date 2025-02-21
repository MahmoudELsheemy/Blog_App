import React, { useEffect, useState } from "react";
import "./postPage.css";
import PostList from "../../Posts/PostList";
import Sidebar from "../../sidebar/Sidebar";
import Pagination from "../../paginition/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { getPostsCount, getPosts } from "../../../redux/apiCalls/PostApiCall";

const Post_page = 4;
const PostPage = () => {
  const [CurrentPage, setPage] = useState(1);
  const { postCount, posts } = useSelector((state) => state.post);

  const pages = Math.ceil(postCount / Post_page);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts(CurrentPage));
    window.scrollTo(0, 0);
    return () => {
      window.scrollTo(0, 0);
    };
  }, [CurrentPage, dispatch]);

  useEffect(() => {
    dispatch(getPostsCount());
  }, [dispatch]);

  return (
    <>
      <div className="postPage">
        <PostList posts={posts} />
        <Sidebar  />
      </div>
      <Pagination pages={pages} currentPage={CurrentPage} setPage={setPage} />
    </>
  );
};

export default PostPage;
