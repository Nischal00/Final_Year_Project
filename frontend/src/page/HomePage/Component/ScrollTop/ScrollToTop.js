import React, { Component } from "react";
import "./ScrollToTop.css";
import menuicon from "./menuicon.svg";

class ScrollToTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_visible: false,
    };
  }

  componentDidMount() {
    var scrollComponent = this;
    document.addEventListener("scroll", function (e) {
      scrollComponent.toggleVisibility();
    });
  }

  toggleVisibility() {
    if (window.pageYOffset > 100) {
      this.setState({
        is_visible: true,
      });
    } else {
      this.setState({
        is_visible: false,
      });
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  render() {
    const { is_visible } = this.state;
    return (
      <div className="scroll-to-top">
        {is_visible && (
          <div onClick={() => this.scrollToTop()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="50"
              height="50"
              viewBox="0 0 172 172"
            >
              <path d="M0,172v-172h172v172z" fill="none"></path>
              <g fill="#234567">
                <path d="M86,6.88c-43.63156,0 -79.12,35.48844 -79.12,79.12c0,43.63156 35.48844,79.12 79.12,79.12c43.63156,0 79.12,-35.48844 79.12,-79.12c0,-43.63156 -35.48844,-79.12 -79.12,-79.12zM115.95219,74.67219c-0.67187,0.67188 -1.54531,1.00781 -2.43219,1.00781c-0.88687,0 -1.76031,-0.33594 -2.43219,-1.00781l-21.64781,-21.64781v74.25562c0,1.90813 -1.54531,3.44 -3.44,3.44c-1.89469,0 -3.44,-1.53187 -3.44,-3.44v-74.25562l-21.64781,21.64781c-1.34375,1.34375 -3.52062,1.34375 -4.86437,0c-1.34375,-1.34375 -1.34375,-3.52062 0,-4.86437l27.52,-27.52c0.3225,-0.3225 0.69875,-0.56438 1.11531,-0.73906c0.84656,-0.34937 1.78719,-0.34937 2.63375,0c0.41656,0.17469 0.79281,0.41656 1.11531,0.73906l27.52,27.52c1.34375,1.34375 1.34375,3.52062 0,4.86437z"></path>
              </g>
            </svg>
          </div>
        )}
      </div>
    );
  }
}

export default ScrollToTop;
