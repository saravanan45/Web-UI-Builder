import React, { Fragment } from "react";
import { useDrag } from "react-dnd";
import { ItemsClone } from "../../Utils/Constants";

const ButtonInDropZone = props => {
  const [{ isDragging }, buttondrag] = useDrag({
    item: {
      type: ItemsClone.elements,
      key: "Button",
      id: props.id
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging
    })
  });
  return (
    <div
      className="drop-btn-container"
      style={{
        top: props.positionY,
        left: props.positionX,
        position: "absolute"
      }}
      ref={buttondrag}
    >
      <div
        className="drop-btn-remove"
        onClick={() => props.removeElement(props.id)}
      >
        <i class="fa fa-close"></i>
      </div>
      <div className="drop-btn-view">
        <button className="drop-btn">Button</button>
      </div>
    </div>
  );
};

export default ButtonInDropZone;
