import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="notFound">
      <div className="notfound-title">404</div>
      <h2 className="notfound-text">Page not found</h2>
      <Link to="/" className="notfound-link">
        Go to Home Page
      </Link>
    </div>
  );
};

export default NotFound;
