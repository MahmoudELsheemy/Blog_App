import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/apiCalls/AuthApiCall";

const HeaderRight = () => {
  const { user } = useSelector((state) => state.auth);
  const [toglle, setToglle] = useState(false);

  const dispatch = useDispatch();

  const handleLogout = () => {
    setToglle(false);
    dispatch(logout());
  };

  return (
    <div className="header-right">
      {user ? (
        <>
          <div className="header-right-user-info">
            <span onClick={() => setToglle(!toglle)} className="user-name">
              {user?.name}
            </span>
            <img
              className="user-image"
              src={user?.image.url}
              alt="user_image"
            />
            {toglle && (
              <div
                onClick={() => setToglle(!toglle)}
                className="header-right-dropdown"
              >
                <Link
                  to={`/profile/${user?._id}`}
                  className="header-dropdown-item"
                >
                  <i className="bi bi-person"></i>
                  <span>Profile</span>
                </Link>
                <div onClick={handleLogout} className="header-dropdown-item">
                  <i className="bi bi-box-arrow-right"></i>
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <Link to="/login" className="header-right-link">
            <i className="bi bi-box-arrow-in-right"></i>
            <span>Login</span>
          </Link>
          <Link to="/register" className="header-right-link">
            <i className="bi bi-person-plus"></i>
            <span>Sign Up</span>
          </Link>
        </>
      )}
    </div>
  );
};

export default HeaderRight;
