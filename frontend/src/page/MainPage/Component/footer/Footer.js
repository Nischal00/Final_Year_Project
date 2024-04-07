import React, { Component } from "react";
import "./Footer.css";

class Footer extends Component {
  render() {
    return (
      <div>
        <footer>
          <div className="bottom">
            <center>
              <span className="credit">
                Created By <a href="/">CodeQuanta</a> |
              </span>
              <span className="far fa-copyright"></span>
              <span> 2024 All rights reserved.</span>
            </center>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
