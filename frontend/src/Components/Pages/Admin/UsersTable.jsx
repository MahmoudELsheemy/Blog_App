import React, { useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import { Link } from "react-router-dom";
import "./UserTable.css";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getProfiles, deleteProfile } from "../../../redux/apiCalls/ProfileApiCall";

const UsersTable = () => {
  const dispatch = useDispatch();
  const { profiles,isProfileDeleted } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getProfiles());
  }, [dispatch,isProfileDeleted]);


     const deleteUser = (id) => {
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
           dispatch(deleteProfile(id));
          }
        });
      };
    
  return (
    <div className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <h1 className="title">Users</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td className="td_name">
                  <div className="user-image">
                    <img src={item?.image?.url} alt="" />
                    <span className="table-name">{item.name}</span>
                  </div>
                </td>
                <td className="email">{item.email}</td>
                <td>
                  <div className="actions">
                    <button className="view-btn">
                      <Link to={`/profile/${item?._id}`}>view profile</Link>
                    </button>
                    <button onClick={() => deleteUser(item?._id)} className="delete-btn">Delete User</button>
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

export default UsersTable;
