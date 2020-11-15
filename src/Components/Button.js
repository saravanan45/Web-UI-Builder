import React from "react";
import { useDrag } from "react-dnd";
import { Items } from "../Utils/Constants";

const Button = () => {
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: Items.elements,
      key: "Button"
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging
    })
  });

  return (
    <div className="btn" ref={drag}>
      <label className="btn-label" htmlFor="btn">
        Button
      </label>
      <button id="btn" className="btn-drag">
        <i className="fa fa-arrows"></i>&nbsp;Drag
      </button>
    </div>
  );
};

export default Button;
