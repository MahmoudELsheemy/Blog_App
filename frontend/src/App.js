import Header from "./Components/header/Header";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Pages/Home/Home";
import PostPage from "./Components/Pages/PostPage/PostPage";
import CreatePost from "./Components/Pages/CreatePost/CreatePost";
import Admin from "./Components/Pages/Admin/Admin";
import Login from "./Components/Pages/Forms/Login";
import Register from "./Components/Pages/Forms/Register";
import Fotter from "./Components/fotter/Fotter";
import PostDetail from "./Components/Pages/postDetails/PostDetail";
import Category from "./Components/Pages/Category/Category";
import Profile from "./Components/Pages/Profile/Profile";
import UsersTable from "./Components/Pages/Admin/UsersTable";
import PostsTable from "./Components/Pages/Admin/PostsTable";
import CategoriesTable from "./Components/Pages/Admin/CategoriesTable";
import CommentsTable from "./Components/Pages/Admin/CommentsTable";
import ForgetPassword from "./Components/Pages/Forms/ForgetPassword";
import ResetPassword from "./Components/Pages/Forms/ResetPassword";
import NotFound from "./Components/Pages/not-found/NotFound";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import VertifyEmail from "./Components/Pages/VertifyEmail/VertifyEmail";

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <ToastContainer position="top-center" theme="dark" />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/users/:id/vertify/:token"
          element={user ? <Navigate to="/" /> : <VertifyEmail />}
        />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
        <Route path="admin">
          <Route
            index
            element={user?.isAdmin ? <Admin /> : <Navigate to="/" />}
          />
          <Route
            path="users"
            element={user?.isAdmin ? <UsersTable /> : <Navigate to="/" />}
          />
          <Route
            path="posts"
            element={user?.isAdmin ? <PostsTable /> : <Navigate to="/" />}
          />
          <Route
            path="categories"
            element={user?.isAdmin ? <CategoriesTable /> : <Navigate to="/" />}
          />
          <Route
            path="comments"
            element={user?.isAdmin ? <CommentsTable /> : <Navigate to="/" />}
          />
        </Route>

        <Route path="posts">
          <Route index element={<PostPage />} />
          <Route
            path="create-post"
            element={user ? <CreatePost /> : <Navigate to="/login" />}
          />{" "}
          <Route
            path="update-post/:id"
            element={user ? <CreatePost /> : <Navigate to="/login" />}
          />{" "}
          <Route path="create-post" element={<CreatePost />} />
          <Route path="details/:id" element={<PostDetail />} />
          <Route path="categories/:category" element={<Category />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Fotter />
    </BrowserRouter>
  );
}

export default App;

// import React from "react";
// import npm install @reduxjs/toolkit
// npm install react-redux
// npm install react-router-dom
/// npm i axios
// npm install react-toastify
//npm swap fire  from  sweetalert2
//npm install react-loader-spinner --save

//https://mhnpd.github.io/react-loader-spinner/
