import React from "react";
import AdminSidebar from "./AdminSidebar";
import AdminMain from "./AdminMain";
import "./Admin.css";

const Admin = () => {
  return (
    <div className="admin">
      <AdminSidebar />
      <AdminMain />
    </div>
  );
};

export default Admin;
