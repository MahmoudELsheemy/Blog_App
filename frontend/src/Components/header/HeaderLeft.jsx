import React from "react";

const HeaderLeft = ({ toglle, setToglle }) => {
  return (
    <div className="header-left">
      <div className="header-logo">
        <span>Blog</span>
        <i className="bi bi-pencil"></i>
      </div>
      <div onClick={() => setToglle(!toglle)} className="header-menu">
        {toglle ? (
          <i className="bi bi-x-lg"></i>
        ) : (
          <i className="bi bi-list"></i>
        )}
      </div>
    </div>
  );
};

export default HeaderLeft;
