import React, { useRef, useEffect } from "react";

function useOutsideGestureDetector({ wrapperRef, props }) {
  useEffect(() => {
    if (props.apply) {
      function handleClickOutside(event) {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
          props.setApply(!props.apply);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [wrapperRef, props]);
}

function OutsideGestureDetector(props) {
  const wrapperRef = useRef(null);
  useOutsideGestureDetector({ wrapperRef, props });
  return <div ref={wrapperRef}>{props.children}</div>;
}

export default OutsideGestureDetector;
