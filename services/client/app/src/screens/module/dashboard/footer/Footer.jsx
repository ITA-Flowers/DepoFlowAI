import React from "react";
import "./Footer.css";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <p>TheFlowers_AI &copy; {new Date().getFullYear()}</p>
      </footer>
    );
  }
}

export default Footer;
