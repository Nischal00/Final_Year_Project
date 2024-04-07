import React, { useState } from "react";

var DragDrop = (props) => {
  const [bgColor, setBgColor] = useState("transparent");

  const changeBgColor = (state) => {
    setBgColor((state && "rgba(34,139,34,0.4)") || "transparent");
    // setBgColor('green')
  };

  return (
    <div
      style={{
        backgroundColor: bgColor,
      }}
      className={props.className}
      // ref={ref}
      onDragEnter={(e) => {
        e.preventDefault();
        e.stopPropagation();
        changeBgColor(true);
        e.dataTransfer.dropEffect = "copy";
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        e.stopPropagation();
        changeBgColor(false);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        changeBgColor(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          props.sendFiles(e.dataTransfer.files);
        }
      }}
    >
      {props.children}
    </div>
  );
};

export default DragDrop;
