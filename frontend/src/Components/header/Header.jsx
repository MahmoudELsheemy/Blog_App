import React, { useState } from "react";
import "./header.css";
import Navbar from "./Navbar";
import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";
const Header = () => {
  const [toglle, setToglle] = useState(false);
  return (
    <header className="header">
      <HeaderLeft toglle={toglle} setToglle={setToglle} />
      <Navbar toglle={toglle} setToglle={setToglle} />
      <HeaderRight />
    </header>
  );
};

export default Header;
