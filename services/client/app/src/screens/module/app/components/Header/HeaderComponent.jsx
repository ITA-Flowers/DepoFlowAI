import React from "react";
import "./HeaderComponent.css";

const Header = ({ title }) => {
  return (
    <header className="header">
      <h4>{title}</h4>
    </header>
  );
};

export default Header;
