import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import "./DropDownLangMenu.css";
import { ReactComponent as ArrowIcon } from "../../../../../assets/images/svg/arrow.svg";

const DropDownMenu = ({
  apply,
  setApply,
  lang,
  handleLanguageChange,
  themeValue,
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
          props.value === lang.value
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
          props.goToMenu && setActiveMenu(props.goToMenu);
        }}
      >
        {props.children}
      </button>
    );
  };

  const DropdownBackItem = (props) => {
    return (
      <button
        className="menu-item-back"
        style={
          themeValue.category === "dark"
            ? { color: "#000000" }
            : { color: "#ffffff" }
        }
        onClick={() => {
          props.goToMenu && setActiveMenu(props.goToMenu);
        }}
      >
        <span className="back-button" style={{ marginRight: "20px" }}>
          {props.leftIcon}
        </span>
        {props.children}
      </button>
    );
  };

  const DropDownVersions = (props) => {
    return (
      <button
        className="menu-item-version"
        style={
          props.value.versionLabel === lang.versionLabel &&
          props.value.label === lang.label
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
          handleLanguageChange(props.value);
          props.goToMenu && setActiveMenu(props.goToMenu);
        }}
      >
        {props.value.versionLabel}
      </button>
    );
  };

  return (
    <div
      className="dropdown-lang"
      ref={dropdownRef}
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
    >
      <CSSTransition
        in={activeMenu === "main"}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div
          className="menu"
          style={{
            display: "grid",
            gridTemplateColumns: "auto auto",
            //  grid-template-columns: "auto auto"
          }}
        >
          <DropdownItem goToMenu="c" value="c">
            C
          </DropdownItem>
          <DropdownItem goToMenu="c++" value="cpp">
            C++
          </DropdownItem>
          <DropdownItem goToMenu="cobol" value="cobol">
            Cobol
          </DropdownItem>
          <DropdownItem goToMenu="c#" value="csharp">
            C#
          </DropdownItem>
          <DropdownItem goToMenu="dart" value="dart">
            Dart
          </DropdownItem>
          <DropdownItem goToMenu="fortran" value="fortran">
            FORTRAN
          </DropdownItem>
          <DropdownItem goToMenu="java" value="java">
            Java
          </DropdownItem>
          <DropdownItem goToMenu="kotlin" value="kotlin">
            Kotlin
          </DropdownItem>
          <DropdownItem goToMenu="nodejs" value="nodejs">
            Node JS
          </DropdownItem>
          <DropdownItem goToMenu="objective c" value="objectivec">
            Objective C
          </DropdownItem>
          <DropdownItem goToMenu="perl" value="perl">
            Perl
          </DropdownItem>
          {/*<DropdownItem goToMenu="php" value="php">
            PHP
          </DropdownItem> */}
          <DropdownItem goToMenu="python2" value="python2">
            Python 2
          </DropdownItem>
          <DropdownItem goToMenu="python3" value="python3">
            Python3
          </DropdownItem>
          <DropdownItem goToMenu="ruby" value="ruby">
            Ruby
          </DropdownItem>
        </div>
      </CSSTransition>

      {/* JAVA */}

      <CSSTransition
        in={activeMenu === "java"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownBackItem goToMenu="main" leftIcon={<ArrowIcon />}>
            Languages
          </DropdownBackItem>
          <DropDownVersions
            goToMenu="main"
            value={{
              value: "java",
              label: "JAVA",
              versionLabel: "JDK 1.8.0_66",
              mode: "java",
              version: "0",
            }}
          />
          <DropDownVersions
            goToMenu="main"
            value={{
              value: "java",
              label: "JAVA",
              versionLabel: "JDK 9.0.1",
              mode: "java",
              version: "1",
            }}
          />
          <DropDownVersions
            goToMenu="main"
            value={{
              value: "java",
              label: "JAVA",
              versionLabel: "JDK 10.0.1",
              mode: "java",
              version: "2",
            }}
          />
          <DropDownVersions
            goToMenu="main"
            value={{
              value: "java",
              label: "JAVA",
              versionLabel: "JDK 11.0.4",
              mode: "java",
              version: "3",
            }}
          />
        </div>
      </CSSTransition>
      {/* C */}
      <CSSTransition
        in={activeMenu === "c"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownBackItem goToMenu="main" leftIcon={<ArrowIcon />}>
            Languages
          </DropdownBackItem>
          <DropDownVersions
            goToMenu="main"
            value={{
              value: "c",
              label: "C",
              versionLabel: "GCC 5.3.0",
              mode: "c_cpp",
              version: "0",
            }}
          />
          <DropDownVersions
            goToMenu="main"
            value={{
              value: "c",
              label: "C",
              versionLabel: "Zapacc 5.0.0",
              mode: "c_cpp",
              version: "1",
            }}
          />
          <DropDownVersions
            goToMenu="main"
            value={{
              value: "c",
              label: "C",
              versionLabel: " GCC 7.2.0",
              mode: "c_cpp",
              version: "2",
            }}
          />
          <DropDownVersions
            goToMenu="main"
            value={{
              value: "c",
              label: "C",
              versionLabel: " GCC 8.1.0",
              mode: "c_cpp",
              version: "3",
            }}
          />

          <DropDownVersions
            goToMenu="main"
            value={{
              value: "c",
              label: "C",
              versionLabel: " GCC 9.1.0",
              mode: "c_cpp",
              version: "4",
            }}
          />
        </div>
      </CSSTransition>

      {/* C++ */}
      <CSSTransition
        in={activeMenu === "c++"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownBackItem goToMenu="main" leftIcon={<ArrowIcon />}>
            Languages
          </DropdownBackItem>

          <DropDownVersions
            goToMenu="main"
            value={{
              value: "cpp",
              label: "C++",
              versionLabel: "GCC 5.3.0",
              mode: "c_cpp",
              version: "0",
            }}
          />
          <DropDownVersions
            goToMenu="main"
            value={{
              value: "cpp",
              label: "C++",
              versionLabel: "Zapcc 5.0.0",
              mode: "c_cpp",
              version: "1",
            }}
          />
          <DropDownVersions
            goToMenu="main"
            value={{
              value: "cpp",
              label: "C++",
              versionLabel: "GCC 7.2.0",
              mode: "c_cpp",
              version: "2",
            }}
          />
          <DropDownVersions
            goToMenu="main"
            value={{
              value: "cpp",
              label: "C++",
              versionLabel: "GCC 8.1.0",
              mode: "c_cpp",
              version: "3",
            }}
          />
          <DropDownVersions
            goToMenu="main"
            value={{
              value: "cpp",
              label: "C++",
              versionLabel: "GCC 9.1.0",
              mode: "c_cpp",
              version: "4",
            }}
          />
        </div>
      </CSSTransition>

      {/* Cobol */}

      <CSSTransition
        in={activeMenu === "cobol"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownBackItem goToMenu="main" leftIcon={<ArrowIcon />}>
            Languages
          </DropdownBackItem>

          <DropDownVersions
            goToMenu="main"
            value={{
              value: "cobol",
              label: "COBOL",
              versionLabel: "GNU 2.0.0",
              mode: "cobol",
              version: "0",
            }}
          />
          <DropDownVersions
            goToMenu="main"
            value={{
              value: "cobol",
              label: "COBOL",
              versionLabel: "GNU 2.2.0",
              mode: "cobol",
              version: "1",
            }}
          />
        </div>
      </CSSTransition>

      {/* C# */}

      <CSSTransition
        in={activeMenu === "c#"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownBackItem goToMenu="main" leftIcon={<ArrowIcon />}>
            Languages
          </DropdownBackItem>

          <DropDownVersions
            goToMenu="main"
            value={{
              value: "csharp",
              label: "C#",
              versionLabel: "mono 4.2.2",
              mode: "csharp",
              version: "0",
            }}
          />
          <DropDownVersions
            goToMenu="main"
            value={{
              value: "csharp",
              label: "C#",
              versionLabel: "mono 5.0.0",
              mode: "csharp",
              version: "1",
            }}
          />
          <DropDownVersions
            goToMenu="main"
            value={{
              value: "csharp",
              label: "C#",
              versionLabel: "mono 5.10.1",
              mode: "csharp",
              version: "2",
            }}
          />
          <DropDownVersions
            goToMenu="main"
            value={{
              value: "csharp",
              label: "C#",
              versionLabel: "mono 6.0.0",
              mode: "csharp",
              version: "3",
            }}
          />
        </div>
      </CSSTransition>

      {/* DART */}
      <CSSTransition
        in={activeMenu === "dart"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownBackItem goToMenu="main" leftIcon={<ArrowIcon />}>
            Languages
          </DropdownBackItem>

          <DropDownVersions
            goToMenu="main"
            value={{
              value: "dart",
              label: "Dart",
              versionLabel: "1.18.0",
              mode: "dart",
              version: "0",
            }}
          />

          <DropDownVersions
            goToMenu="main"
            value={{
              value: "dart",
              label: "Dart",
              versionLabel: "1.24.2",
              mode: "dart",
              version: "1",
            }}
          />
          <DropDownVersions
            goToMenu="main"
            value={{
              value: "dart",
              label: "Dart",
              versionLabel: "1.24.3",
              mode: "dart",
              version: "2",
            }}
          />

          <DropDownVersions
            goToMenu="main"
            value={{
              value: "dart",
              label: "Dart",
              versionLabel: "2.5.1",
              mode: "dart",
              version: "3",
            }}
          />
        </div>
      </CSSTransition>

      {/* FORTRAN */}

      <CSSTransition
        in={activeMenu === "fortran"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownBackItem goToMenu="main" leftIcon={<ArrowIcon />}>
            Languages
          </DropdownBackItem>

          <DropDownVersions
            goToMenu="main"
            value={{
              value: "fortran",
              label: "FORTRAN",
              versionLabel: "GNU 5.3.0",
              mode: "fortran",
              version: "0",
            }}
          />
          <DropDownVersions
            goToMenu="main"
            value={{
              value: "fortran",
              label: "FORTRAN",
              versionLabel: "GNU 7.2.0",
              mode: "fortran",
              version: "1",
            }}
          />
          <DropDownVersions
            goToMenu="main"
            value={{
              value: "fortran",
              label: "FORTRAN",
              versionLabel: "GNU 8.1.0",
              mode: "fortran",
              version: "2",
            }}
          />
          <DropDownVersions
            goToMenu="main"
            value={{
              value: "fortran",
              label: "FORTRAN",
              versionLabel: "GNU 9.1.0",
              mode: "fortran",
              version: "3",
            }}
          />
        </div>
      </CSSTransition>

      {/* kotlin */}
      <CSSTransition
        in={activeMenu === "kotlin"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownBackItem goToMenu="main" leftIcon={<ArrowIcon />}>
            Languages
          </DropdownBackItem>

          <DropDownVersions
            goToMenu="main"
            value={{
              value: "kotlin",
              label: "Kotlin",
              versionLabel: "1.1.51",
              mode: "kotlin",
              version: "0",
            }}
          />
          <DropDownVersions
            goToMenu="main"
            value={{
              value: "kotlin",
              label: "Kotlin",
              versionLabel: "1.3.50",
              mode: "kotlin",
              version: "1",
            }}
          />
        </div>
      </CSSTransition>

      {/* Node JS */}

      <CSSTransition
        in={activeMenu === "nodejs"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownBackItem goToMenu="main" leftIcon={<ArrowIcon />}>
            Languages
          </DropdownBackItem>
          <DropDownVersions
            goToMenu="main"
            value={{
              value: "nodejs",
              label: "Node Js",
              versionLabel: "6.3.1",
              mode: "javascript",
              version: "0",
            }}
          />

          <DropDownVersions
            goToMenu="main"
            value={{
              value: "nodejs",
              label: "Node Js",
              versionLabel: "9.2.0",
              mode: "javascript",
              version: "1",
            }}
          />

          <DropDownVersions
            goToMenu="main"
            value={{
              value: "nodejs",
              label: "Node Js",
              versionLabel: "10.1.0",
              mode: "javascript",
              version: "2",
            }}
          />

          <DropDownVersions
            goToMenu="main"
            value={{
              value: "nodejs",
              label: "Node Js",
              versionLabel: "12.11.1",
              mode: "javascript",
              version: "3",
            }}
          />
        </div>
      </CSSTransition>

      {/* Objective C */}

      <CSSTransition
        in={activeMenu === "objective c"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownBackItem goToMenu="main" leftIcon={<ArrowIcon />}>
            Languages
          </DropdownBackItem>
          <DropDownVersions
            goToMenu="main"
            value={{
              value: "objectivec",
              label: "Objective C",
              versionLabel: "GCC 5.3.0",
              mode: "objectivec",
              version: "0",
            }}
          />
          <DropDownVersions
            goToMenu="main"
            value={{
              value: "objectivec",
              label: "Objective C",
              versionLabel: "GCC 7.2.0",
              mode: "objectivec",
              version: "1",
            }}
          />
          <DropDownVersions
            goToMenu="main"
            value={{
              value: "objectivec",
              label: "Objective C",
              versionLabel: "GCC 8.1.0",
              mode: "objectivec",
              version: "2",
            }}
          />
          <DropDownVersions
            goToMenu="main"
            value={{
              value: "objectivec",
              label: "Objective C",
              versionLabel: "GCC 9.1.0",
              mode: "objectivec",
              version: "3",
            }}
          />
        </div>
      </CSSTransition>
      {/* Perl */}

      <CSSTransition
        in={activeMenu === "perl"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownBackItem goToMenu="main" leftIcon={<ArrowIcon />}>
            Languages
          </DropdownBackItem>

          <DropDownVersions
            goToMenu="main"
            value={{
              value: "perl",
              label: "Perl",
              versionLabel: "5.22.0",
              mode: "perl",
              version: "0",
            }}
          />

          <DropDownVersions
            goToMenu="main"
            value={{
              value: "perl",
              label: "Perl",
              versionLabel: "5.26.1",
              mode: "perl",
              version: "0",
            }}
          />

          <DropDownVersions
            goToMenu="main"
            value={{
              value: "perl",
              label: "Perl",
              versionLabel: "5.26.2",
              mode: "perl",
              version: "2",
            }}
          />

          <DropDownVersions
            goToMenu="main"
            value={{
              value: "perl",
              label: "Perl",
              versionLabel: "5.30.0",
              mode: "perl",
              version: "3",
            }}
          />
        </div>
      </CSSTransition>

      {/* php */}
      {/*      <CSSTransition
        in={activeMenu === "php"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownBackItem goToMenu="main" leftIcon={<ArrowIcon />}>
            Languages
          </DropdownBackItem>

          <DropDownVersions
            goToMenu="main"
            value={{
              value: "php",
              label: "PHP",
              versionLabel: "5.6.16",
              mode: "php",
              version: "0",
            }}
          />

          <DropDownVersions
            goToMenu="main"
            value={{
              value: "php",
              label: "PHP",
              versionLabel: "7.1.11",
              mode: "php",
              version: "1",
            }}
          />

          <DropDownVersions
            goToMenu="main"
            value={{
              value: "php",
              label: "PHP",
              versionLabel: "7.2.5",
              mode: "php",
              version: "2",
            }}
          />

          <DropDownVersions
            goToMenu="main"
            value={{
              value: "php",
              label: "PHP",
              versionLabel: "7.3.10",
              mode: "php",
              version: "3",
            }}
          />
        </div>
      </CSSTransition>

 */}

      {/* python2 */}

      <CSSTransition
        in={activeMenu === "python2"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownBackItem goToMenu="main" leftIcon={<ArrowIcon />}>
            Languages
          </DropdownBackItem>

          <DropDownVersions
            goToMenu="main"
            value={{
              value: "python2",
              label: "Python2",
              versionLabel: "2.7.11",
              mode: "python",
              version: "0",
            }}
          />

          <DropDownVersions
            goToMenu="main"
            value={{
              value: "python2",
              label: "Python2",
              versionLabel: "2.7.15",
              mode: "python",
              version: "1",
            }}
          />
          <DropDownVersions
            goToMenu="main"
            value={{
              value: "python2",
              label: "Python2",
              versionLabel: "2.7.16",
              mode: "python",
              version: "2",
            }}
          />
        </div>
      </CSSTransition>

      {/* python 3 */}

      <CSSTransition
        in={activeMenu === "python3"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownBackItem goToMenu="main" leftIcon={<ArrowIcon />}>
            Languages
          </DropdownBackItem>

          <DropDownVersions
            goToMenu="main"
            value={{
              value: "python3",
              label: "Pyhton3",
              versionLabel: "3.5.1",
              mode: "python",
              version: "0",
            }}
          />

          <DropDownVersions
            goToMenu="main"
            value={{
              value: "python3",
              label: "Python3",
              versionLabel: "3.6.3",
              mode: "python",
              version: "1",
            }}
          />
          <DropDownVersions
            goToMenu="main"
            value={{
              value: "python3",
              label: "Python3",
              versionLabel: "3.6.5",
              mode: "python",
              version: "2",
            }}
          />
          <DropDownVersions
            goToMenu="main"
            value={{
              value: "python3",
              label: "Python3",
              versionLabel: "3.7.4",
              mode: "python",
              version: "3",
            }}
          />
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "ruby"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownBackItem goToMenu="main" leftIcon={<ArrowIcon />}>
            Languages
          </DropdownBackItem>

          <DropDownVersions
            goToMenu="main"
            value={{
              value: "ruby",
              label: "Ruby",
              versionLabel: "2.2.4",
              mode: "ruby",
              version: "0",
            }}
          />

          <DropDownVersions
            goToMenu="main"
            value={{
              value: "ruby",
              label: "Ruby",
              versionLabel: "2.4.2p198",
              mode: "ruby",
              version: "1",
            }}
          />

          <DropDownVersions
            goToMenu="main"
            value={{
              value: "ruby",
              label: "Ruby",
              versionLabel: "2.5.1p57",
              mode: "ruby",
              version: "2",
            }}
          />

          <DropDownVersions
            goToMenu="main"
            value={{
              value: "ruby",
              label: "Ruby",
              versionLabel: "2.6.5",
              mode: "ruby",
              version: "3",
            }}
          />
        </div>
      </CSSTransition>
    </div>
  );
};

export default DropDownMenu;
