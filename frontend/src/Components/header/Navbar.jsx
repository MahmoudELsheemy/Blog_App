import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = ({ toglle, setToglle }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <nav
      style={{
        clipPath: toglle && "polygon(0 0, 100% 0%, 100% 100%, 0% 100%)",
      }}
      className="navbar"
    >
      <ul>
        <Link to="/" onClick={() => setToglle(!toglle)} className="nav-links">
          <i className="bi bi-house-door"></i>Home
        </Link>
        <Link
          to="/posts"
          onClick={() => setToglle(!toglle)}
          className="nav-links"
        >
          <i className="bi bi-stickies"></i>Posts
        </Link>
        {user && (
          <Link
            to="/posts/create-post"
            onClick={() => setToglle(!toglle)}
            className="nav-links"
          >
            <i className="bi bi-journal-plus"></i>Create
          </Link>
        )}
        {user?.isAdmin && (
          <Link
            to="/admin"
            onClick={() => setToglle(!toglle)}
            className="nav-links"
          >
            <i className="bi bi-person-check"></i>Admin Dasboard
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
