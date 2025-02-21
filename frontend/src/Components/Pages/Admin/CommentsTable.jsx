import React, { useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  fetshAllComment,
  deleteeComment,
} from "../../../redux/apiCalls/CommentApiCall";
import { Link } from "react-router-dom";

const CommentsTable = () => {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.comment);

  useEffect(() => {
    dispatch(fetshAllComment());
  }, [dispatch]);

  const deleteComments = (id) => {
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
        dispatch(deleteeComment(id));
      }
    });
  };

  return (
    <div className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <h1 className="title">Comments</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Comment</th>
              <th>Post</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="user-image">
                    <img src={item?.user?.image?.url} alt="" />
                    <span className="table-name">{item?.user?.name}</span>
                  </div>
                </td>
                <td className="email">{item?.content}</td>
                <td className="email">
                  <Link to={`/posts/details/${item?.postId}`}>View Post</Link>{" "}
                </td>
                <td>
                  <div className="actions">
                    <button
                      onClick={() => deleteComments(item._id)}
                      className="delete-btn"
                    >
                      Delete Comment
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

export default CommentsTable;
