import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import "./dropdownmenu.css";
import Switch from "react-switch";

const DropdownMenu = ({
  apply,
  setApply,
  creator,
  editorReadOnly,
  handleEditorReadOnly,
  editorFontSize,
  handleEditorFontChange,
  themeValue,
  handleThemeChange,
  handleEditorHeight,
}) => {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);

  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  const calcHeight = (el) => {
    const height = el.offsetHeight;
    setMenuHeight(height);
  };

  const DropdownItem = (props) => {
    return (
      <button
        className="menu-item"
        style={
          themeValue.category === "dark"
            ? { color: "#000000" }
            : { color: "#ffffff" }
        }
        onClick={() => {
          props.goToMenu && setActiveMenu(props.goToMenu);
        }}
      >
        {props.children}
        <span
          style={
            themeValue.category === "dark"
              ? { color: "#003166", marginRight: 10, fontWeight: "bold" }
              : { color: "#99caff", marginRight: 10, fontWeight: "bold" }
          }
        >
          {themeValue.label}
        </span>
      </button>
    );
  };

  const DropdownDefaultItem = (props) => {
    return (
      <button
        className="menu-item"
        style={
          themeValue.category === "dark"
            ? { color: "#000000" }
            : { color: "#ffffff" }
        }
        onClick={() => {
          setApply(!apply);
          handleEditorHeight();
        }}
      >
        {props.children}
      </button>
    );
  };

  const DropdownEditorItem = (props) => {
    return (
      <button
        className="menu-item"
        style={
          themeValue.category === "dark"
            ? { color: "#000000" }
            : { color: "#ffffff" }
        }
      >
        {props.children}
        <Switch
          checked={editorReadOnly}
          onChange={handleEditorReadOnly}
          onColor="#86d3ff"
          onHandleColor="#2693e6"
          handleDiameter={20}
          uncheckedIcon={false}
          checkedIcon={false}
          height={16}
          width={40}
          className="react-switch"
          id="material-switch"
        />
      </button>
    );
  };

  //active cupertino blue color hex #007aff
  const DropdownThemeItem = (props) => {
    return (
      <button
        className="menu-item"
        style={
          props.value.mode === themeValue.mode
            ? themeValue.category === "dark"
              ? {
                  backgroundColor: `${themeValue.primaryColor}`,
                  color: "#000000",
                }
              : {
                  backgroundColor: `${themeValue.primaryColor}`,
                  color: "#ffffff",
                }
            : themeValue.category === "dark"
            ? {
                color: "#000000",
              }
            : {
                color: "#ffffff",
              }
        }
        onClick={() => {
          setApply(!apply);
          handleThemeChange(props.value);
          props.goToMenu && setActiveMenu(props.goToMenu);
        }}
      >
        {props.value.label}
        {}
      </button>
    );
  };

  const DropdownFontItem = (props) => {
    return (
      <div>
        <button
          className="menu-font-item"
          style={
            themeValue.category === "dark"
              ? { color: "#000000" }
              : { color: "#ffffff" }
          }
        >
          {props.children}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              right: 0,
              justifyContent: "center",
            }}
          >
            <div
              className="icon-button-font"
              style={
                themeValue.category === "dark"
                  ? { color: "#003166", marginRight: "5px", fontWeight: "bold" }
                  : { color: "#99caff", marginRight: "5px", fontWeight: "bold" }
              }
              onClick={() => {
                if (editorFontSize < 18) {
                  handleEditorFontChange(editorFontSize + 1);
                }
              }}
            >
              +
            </div>
            <div
              className="icon-button-text"
              onClick={() => null}
              style={
                themeValue.category === "dark"
                  ? { color: "#000000" }
                  : { color: "#ffffff" }
              }
            >
              {editorFontSize}
            </div>
            <div
              className="icon-button-font"
              style={
                themeValue.category === "dark"
                  ? { color: "#003166", marginLeft: "5px", fontWeight: "bold" }
                  : { color: "#99caff", marginLeft: "5px", fontWeight: "bold" }
              }
              onClick={() => {
                if (editorFontSize > 12) {
                  handleEditorFontChange(editorFontSize - 1);
                }
              }}
            >
              -
            </div>
          </div>
        </button>
      </div>
    );
  };

  return (
    <div
      className="dropdown-setting"
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
          <DropdownFontItem>Font Size</DropdownFontItem>
          <DropdownItem goToMenu="theme">Theme</DropdownItem>
          <DropdownDefaultItem>Standard Input</DropdownDefaultItem>
          {creator && <DropdownEditorItem>Disable Editor</DropdownEditorItem>}
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "theme"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownThemeItem
            goToMenu="main"
            value={{
              category: "light",
              label: "IPlastic",
              theme: "iplastic",
              mode: 0,
              backgroundColor: "#eeeeee",
              primaryColor: "#3366cc",
              textColor: "#000000",
              shadeColorInput: "#a6a6a6",
              hintColor: "#19404a",
              headerColor: "#8e8e8e",
              sideColor: "#dddddd",
            }}
          />
          <DropdownThemeItem
            goToMenu="main"
            value={{
              category: "dark",
              label: "Monokai",
              theme: "monokai",
              mode: 1,
              backgroundColor: "#272822",
              primaryColor: "#96cb2c",
              textColor: "#ffffff",
              shadeColorInput: "#676864",
              headerColor: "#171814",
              sideColor: "#303129",
            }}
          />
          <DropdownThemeItem
            goToMenu="main"
            value={{
              category: "dark",
              label: "Solarized Dark",
              theme: "solarized_dark",
              mode: 2,
              backgroundColor: "#002b36",
              primaryColor: "#2384c6",
              textColor: "#ffffff",
              shadeColorInput: "#4c6a72",
              headerColor: "#001920",
              sideColor: "#01313F",
            }}
          />
          <DropdownThemeItem
            goToMenu="main"
            value={{
              category: "light",
              label: "Solarized Light",
              theme: "solarized_light",
              mode: 3,
              backgroundColor: "#fdf6e3",
              primaryColor: "#2b8dd2",
              textColor: "#000000",
              shadeColorInput: "#b1ac9e",
              headerColor: "#c0beb7",
              sideColor: "#FBF1D3",
            }}
          />
          <DropdownThemeItem
            goToMenu="main"
            value={{
              category: "dark",
              label: "Vibrant Ink",
              theme: "vibrant_ink",
              mode: 4,
              backgroundColor: "#0f0f0f",
              primaryColor: "#ff6600",
              textColor: "#ffffff",
              shadeColorInput: "#575757",
              headerColor: "#090909", //#090909
              sideColor: "#1A1A1A",
            }}
          />
          <DropdownThemeItem
            goToMenu="main"
            value={{
              category: "light",
              label: "XCode",
              theme: "xcode",
              mode: 5,
              backgroundColor: "#ffffff",
              primaryColor: "#810481",
              textColor: "#000000",
              shadeColorInput: "#b2b2b2",
              headerColor: "#999999",
              sideColor: "#E8E8E8",
            }}
          />
        </div>
      </CSSTransition>
    </div>
  );
};

export default DropdownMenu;
