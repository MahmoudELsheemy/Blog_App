import React from "react";

const Fotter = () => {
  return (
    <div style={style} className="fotter">
      Copy Right &copy; 2025
    </div>
  );
};
const style = {
  color: "white",
  fontSize: "20px",
  backgroundColor: "#1d2d3d",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "70px",
  width: "100vw",
  position: "relative",
  top: "0",
  left: "0",
  zIndex: "100",
  border: "2px solid var(--white-color)",
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  borderRadius: "10px",
  pading: "20px",
};

export default Fotter;
