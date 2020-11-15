import React, { useState } from "react";
import { useDrop, useDragLayer } from "react-dnd";
import { Items, ItemsClone } from "../Utils/Constants";
import ButtonInDropZone from "./DropZone/ButtonInDropZone";
import TextInDropZone from "./DropZone/TextInDropZone";
import DropDownInDropZone from "./DropZone/DropDownInDropZone";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import { updateElementPositionInStore } from "../Redux/actions";

const DropContainer = props => {
  const [{ isOver }, dropRef] = useDrop({
    accept: [Items.elements, ItemsClone.elements],
    drop: (item, monitor) => onDrop(item, monitor),
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  });

  const onDrop = (item, monitor) => {
    const { x, y } = monitor.getSourceClientOffset();
    if (item.id) {
      const data = {
        id: item.id,
        positionX: x,
        positionY: y
      };
      return props.updateElementPosition(data);
    }
    const data = {
      id: uuidv4(),
      type: item.key,
      positionX: x,
      positionY: y
    };

    if (item.key == "Text") {
      data.heading = "Heading";
      data.paragraph =
        "Welcome to UI Builder! You can build your own elements here!";
    }
    if (item.key == "DropDown") {
      data.selectedValue = "";
    }
    console.log(
      "monitorr",
      !!monitor.didDrop(),
      monitor.getClientOffset(),
      monitor.getItemType(),
      monitor.getItem(),
      data
    );
    props.changeResultElements(data);
  };

  return (
    <div className="right-container" ref={dropRef}>
      {props.elements &&
        props.elements.map(element => {
          if (element.type == "Button") {
            return (
              <ButtonInDropZone
                id={element.id}
                positionX={element.positionX}
                positionY={element.positionY}
                removeElement={props.removeElement}
              />
            );
          }
          if (element.type == "Text") {
            return (
              <TextInDropZone
                id={element.id}
                positionX={element.positionX}
                positionY={element.positionY}
                removeElement={props.removeElement}
                heading={element.heading}
                paragraph={element.paragraph}
              />
            );
          }
          if (element.type == "DropDown") {
            return (
              <DropDownInDropZone
                id={element.id}
                positionX={element.positionX}
                positionY={element.positionY}
                removeElement={props.removeElement}
                dropDownselectedValue={element.selectedValue}
              />
            );
          }
        })}
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  updateElementPosition: data => dispatch(updateElementPositionInStore(data))
});

export default connect(
  null,
  mapDispatchToProps
)(DropContainer);
