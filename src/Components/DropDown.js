import React from "react";
import { useDrag } from "react-dnd";
import { Items } from "../Utils/Constants";

const DropDown = () => {
  const [{ isDragging }, dropDownRef] = useDrag({
    item: {
      type: Items.elements,
      key: "DropDown"
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging
    })
  });

  return (
    <div className="dropdown" ref={dropDownRef}>
      <label className="dropdown-label" htmlFor="dropdown">
        DropDown
      </label>
      <button id="dropdown" className="dropdown-drag">
        <i className="fa fa-arrows"></i>&nbsp;Drag
      </button>
    </div>
  );
};
export default DropDown;
