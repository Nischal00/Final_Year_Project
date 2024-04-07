import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import "./DropDownParticipant.css";
import Online from "../../../../../assets/images/dropdownparticipant/online.png";

const DropDownParticipant = ({
  apply,
  setApply,
  themeValue,
  users,
  status,
}) => {
  const activeMenu = "main";
  const [menuHeight, setMenuHeight] = useState(null);

  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  const calcHeight = (el) => {
    const height = el.offsetHeight;
    setMenuHeight(height);
  };

  const DropdownDefaultItem = (props) => {
    return (
      <button
        className="menu-item-participant"
        style={
          themeValue.category === "dark"
            ? { color: "#000000" }
            : { color: "#ffffff" }
        }
        onClick={() => {
          setApply(!apply);
        }}
      >
        <img
          src={Online}
          alt="online"
          height="15px"
          width="15px"
          style={{ marginRight: "10px" }}
        />

        {props.children}
      </button>
    );
  };
  return (
    <div
      className="dropdown-participant"
      style={
        themeValue.category === "dark"
          ? {
              height: menuHeight,
              backgroundColor: "rgba(255, 255, 255, 0.7)",
            }
          : {
              height: menuHeight,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            }
      }
      ref={dropdownRef}
    >
      <CSSTransition
        in={activeMenu === "main"}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          {users ? (
            users.map(({ name }) => (
              <DropdownDefaultItem key={name}>{name}</DropdownDefaultItem>
            ))
          ) : (
            <DropdownDefaultItem>No User</DropdownDefaultItem>
          )}
        </div>
      </CSSTransition>
    </div>
  );
};

export default DropDownParticipant;
