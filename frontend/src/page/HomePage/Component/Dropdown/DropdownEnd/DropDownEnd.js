import React from "react";
import { CSSTransition } from "react-transition-group";
import "./DropDownEnd.css";

const DropDownEnd = ({ apply, setApply, handleDisconnect }) => {
  const activeMenu = "main";

  //   const dropdownRef = useRef(null);

  //   useEffect(() => {
  //     setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  //   }, []);

  //   const calcHeight = (el) => {
  //     const height = el.offsetHeight;
  //     setMenuHeight(height);
  //   };

  return (
    <div
      className="dropdown-end"
      style={{
        height: "40px",
        backgroundColor: "rgba(204, 0, 0, 0.75)",
      }}
      //      ref={dropdownRef}
    >
      <CSSTransition
        in={activeMenu === "main"}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        //        onEnter={calcHeight}
      >
        <div className="menu-end">
          <button
            className="menu-item-end"
            style={{ color: "#ffffff", zIndex: 1200 }}
            onClick={() => {
              handleDisconnect();
              setApply(!apply);
            }}
          >
            Leave Room
          </button>
        </div>
      </CSSTransition>
    </div>
  );
};

export default DropDownEnd;
