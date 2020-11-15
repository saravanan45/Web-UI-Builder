import React from "react";
import { useDrag } from "react-dnd";
import { Items } from "../Utils/Constants";

const Text = () => {
  const [{ isDragging }, textDrag] = useDrag({
    item: {
      type: Items.elements,
      key: "Text"
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging
    })
  });

  return (
    <div className="text" ref={textDrag}>
      <label className="text-label" htmlFor="btn">
        Text
      </label>
      <button id="text" className="text-drag" style={{}}>
        <i className="fa fa-arrows"></i>&nbsp;Drag
      </button>
    </div>
  );
};
export default Text;
