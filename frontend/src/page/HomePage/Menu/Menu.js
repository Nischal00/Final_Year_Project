import React, { useState, useEffect } from "react";
import "./Menu.css";
import ReactLoading from "react-loading";
import ReactTooltip from "react-tooltip";
var day = new Date().getDate(); //Current Date
var month = new Date().getMonth() + 1; //Current Month
var year = new Date().getFullYear(); //Current Year
var currentDate = day + "/" + month + "/" + year;

const MenuBar = ({
  themeValue,
  users,
  endMenu,
  handleOpenEndMenu,
  userMenu,
  handleOpenUserMenu,
  status,
  inviteUser,
  handleOpenInviteUser,
  currentTab,
  handleCurrentTab,
  creator,
  handleJsPdfGenerator,
}) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    var timerID = setInterval(() => tick(), 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  });

  function tick() {
    setDate(new Date());
  }

  return (
    <div
      className="top-bar"
      style={{ backgroundColor: `${themeValue.headerColor}` }}
    >
      <div className="row no-gutters">
        <button
          className="projectName"
          disabled
          style={{
            color: `${themeValue.primaryColor}`,
            zIndex: 10,
            borderStyle: "none",
          }}
        >
          {currentDate}
        </button>
        <button
          className="projectName"
          disabled
          style={{
            color: `${themeValue.primaryColor}`,
            zIndex: 10,
            marginLeft: "15px",
            borderStyle: "none",
          }}
        >
          {date.toLocaleTimeString().replace("AM", "").replace("PM", "")}
        </button>
      </div>
      <div className="row no-gutters">
        {creator && (
          <div className="row" style={{ marginRight: "6px" }}>
            {currentTab === "NOTES" && (
              <div
                className="download-btn"
                onClick={() => handleJsPdfGenerator()}
              >
                <svg
                  fill={`${themeValue.primaryColor}`}
                  width="24px"
                  height="24px"
                  viewBox="0 0 482.14 482.14"
                  data-tip
                  data-for="pdfTip"
                  data-delay-show="700"
                >
                  <path
                    d="M142.024,310.194c0-8.007-5.556-12.782-15.359-12.782c-4.003,0-6.714,0.395-8.132,0.773v25.69
		c1.679,0.378,3.743,0.504,6.588,0.504C135.57,324.379,142.024,319.1,142.024,310.194z"
                  />
                  <path
                    d="M202.709,297.681c-4.39,0-7.227,0.379-8.905,0.772v56.896c1.679,0.394,4.39,0.394,6.841,0.394
		c17.809,0.126,29.424-9.677,29.424-30.449C230.195,307.231,219.611,297.681,202.709,297.681z"
                  />
                  <path
                    d="M315.458,0H121.811c-28.29,0-51.315,23.041-51.315,51.315v189.754h-5.012c-11.418,0-20.678,9.251-20.678,20.679v125.404
		c0,11.427,9.259,20.677,20.678,20.677h5.012v22.995c0,28.305,23.025,51.315,51.315,51.315h264.223
		c28.272,0,51.3-23.011,51.3-51.315V121.449L315.458,0z M99.053,284.379c6.06-1.024,14.578-1.796,26.579-1.796
		c12.128,0,20.772,2.315,26.58,6.965c5.548,4.382,9.292,11.615,9.292,20.127c0,8.51-2.837,15.745-7.999,20.646
		c-6.714,6.32-16.643,9.157-28.258,9.157c-2.585,0-4.902-0.128-6.714-0.379v31.096H99.053V284.379z M386.034,450.713H121.811
		c-10.954,0-19.874-8.92-19.874-19.889v-22.995h246.31c11.42,0,20.679-9.25,20.679-20.677V261.748
		c0-11.428-9.259-20.679-20.679-20.679h-246.31V51.315c0-10.938,8.921-19.858,19.874-19.858l181.89-0.19v67.233
		c0,19.638,15.934,35.587,35.587,35.587l65.862-0.189l0.741,296.925C405.891,441.793,396.987,450.713,386.034,450.713z
		 M174.065,369.801v-85.422c7.225-1.15,16.642-1.796,26.58-1.796c16.516,0,27.226,2.963,35.618,9.282
		c9.031,6.714,14.704,17.416,14.704,32.781c0,16.643-6.06,28.133-14.453,35.224c-9.157,7.612-23.096,11.222-40.125,11.222
		C186.191,371.092,178.966,370.446,174.065,369.801z M314.892,319.226v15.996h-31.23v34.973h-19.74v-86.966h53.16v16.122h-33.42
		v19.875H314.892z"
                  />
                </svg>
                <ReactTooltip id="pdfTip" place="left" effect="solid">
                  Download Notes PDF
                </ReactTooltip>
              </div>
            )}

            <div
              className="output-notes-wrapper"
              style={{ borderColor: `${themeValue.primaryColor}` }}
            >
              <button
                className="output-button"
                onClick={() => handleCurrentTab("OUTPUT")}
                style={{
                  color: `${
                    currentTab === "OUTPUT"
                      ? themeValue.headerColor
                      : themeValue.primaryColor
                  }`,
                  zIndex: 10,
                  backgroundColor: `${
                    currentTab === "OUTPUT"
                      ? themeValue.primaryColor
                      : themeValue.headerColor
                  }`,
                }}
              >
                output
              </button>
              <button
                className="notes-button"
                onClick={() => {
                  handleCurrentTab("NOTES");
                }}
                style={{
                  color: `${
                    currentTab === "NOTES"
                      ? themeValue.headerColor
                      : themeValue.primaryColor
                  }`,
                  zIndex: 10,
                  backgroundColor: `${
                    currentTab === "NOTES"
                      ? themeValue.primaryColor
                      : themeValue.headerColor
                  }`,
                }}
              >
                notes
              </button>
            </div>
          </div>
        )}
        <button
          className="invite-button"
          onClick={() => handleOpenInviteUser(!inviteUser)}
          style={{
            color: `${themeValue.primaryColor}`,
            zIndex: 10,
          }}
        >
          + invite
        </button>

        <button
          className="user-button"
          onMouseEnter={() => handleOpenUserMenu(true)}
          onMouseLeave={() => handleOpenUserMenu(false)}
          style={{
            color: `${themeValue.primaryColor}`,
            zIndex: 10,
            display: "flex",
            flexDirection: "row",
          }}
        >
          users(
          {status === null ? (
            <ReactLoading
              type="spokes"
              color="#fff"
              height="20px"
              width="20px"
            />
          ) : (
            status
          )}
          )
        </button>

        <button
          className="endIn-button"
          onClick={() => handleOpenEndMenu(!endMenu)}
          style={
            endMenu
              ? {
                  color: "#cc0000",
                  width: "70px",
                  zIndex: 10,
                  marginRight: "10px",
                  textAlign: "center",
                  borderStyle: "none",
                }
              : {
                  color: "#ffffff",
                  width: "70px",
                  backgroundColor: "#cc0000",
                  zIndex: 10,
                  marginRight: "10px",
                  textAlign: "center",
                  borderStyle: "none",
                  borderRadius: "5px",
                }
          }
        >
          {endMenu ? "cancel" : "end"}
        </button>
      </div>
    </div>
  );
};
export default MenuBar;
