import React from "react";
import "./Paginate.css";

const Pagination = ({ pages, currentPage, setPage }) => {
  const generatePages = [];

  for (let i = 1; i <= pages; i++) {
    generatePages.push(i);
  }
  return (
    <div className="pagination">
      <button onClick={() => setPage(currentPage - 1)} disabled={currentPage === 1} className="page-pervios">Previos </button>
      {generatePages.map((item) => (
        <div
          onClick={() => setPage(item)}
          key={item}
          className={item === currentPage ? "page active" : "page"}
        >
          {" "}
          {item}{" "}
        </div>
      ))}
      <button onClick={() => setPage(currentPage + 1)} disabled={currentPage === pages} className="page-next">Next</button>
    </div>
  );
};

export default Pagination;
