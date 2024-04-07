import React, { Component } from "react";
import "./Navbar.css";
import menuicon from "../../../../assets/images/svg/menuicon.svg";
import crossicon from "../../../../assets/images/svg/crossicon.svg";
import EnterCodingLogo from "../../../../assets/images/navbar/EnterCodingLogo.png";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav>
          <input type="checkbox" id="check"></input>
          <label className="float-right">
            <img src={menuicon} alt="menu" id="menu" />
            <img src={crossicon} alt="cancel" id="cancel" />
          </label>
          <Link to="/">
            {/* <img src={EnterCodingLogo} alt="logo" className="logo" /> */}
          </Link>
          <ul>
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/features">
              <li>Features</li>
            </Link>
            <Link to="/blogs">
              <li>Blog</li>
            </Link>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Navbar;
