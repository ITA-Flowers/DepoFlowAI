import React from "react";
import "./SidebarComponent.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li>
            <Link to="/monitoring">Monitoring</Link>
          </li>
          <li>
            <Link to="/predykcja">Predykcja</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
