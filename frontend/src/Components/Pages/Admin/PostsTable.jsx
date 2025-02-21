import React from "react";
import AdminSidebar from "./AdminSidebar";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, DeletePost } from "../../../redux/apiCalls/PostApiCall";

const PostsTable = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const deletePost = (postId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(DeletePost(postId));
      }
    });
  };

  return (
    <div className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <h1 className="title">Posts</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>Name</th>
              <th>Post Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="user-image">
                    <img src={item?.user?.image.url} alt="" />
                    <span className="table-name">{item?.user?.name}</span>
                  </div>
                </td>
                <td className="post-title">{item.title}</td>
                <td>
                  <div className="actions">
                    <button className="view-btn">
                      <Link to={`/posts/details/${item._id}`}>view Posts</Link>
                    </button>
                    <button
                      onClick={() => deletePost(item._id)}
                      className="delete-btn"
                    >
                      Delete User
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostsTable;
