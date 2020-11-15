import React, { useState, useEffect } from "react";
import { useDrag } from "react-dnd";
import { ItemsClone } from "../../Utils/Constants";
import { connect } from "react-redux";
import { updateDropdownValueInStore } from "../../Redux/actions";

const DropDownInDropZone = ({
  id,
  removeElement,
  positionX,
  positionY,
  updateSelectedValue,
  dropDownselectedValue
}) => {
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    if (dropDownselectedValue !== selectedValue) {
      setSelectedValue(dropDownselectedValue);
    }
  }, [dropDownselectedValue]);

  const [{ isDragging }, dropDownRef] = useDrag({
    item: {
      type: ItemsClone.elements,
      key: "DropDown",
      id: id
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging
    })
  });

  const changeSelectedValue = e => {
    const value = e.target.value;
    setSelectedValue(value);
    const data = {
      id,
      selectedValue: value
    };
    updateSelectedValue(data);
  };
  return (
    <div
      ref={dropDownRef}
      className="drop-dropDown-container"
      style={{
        top: positionY,
        left: positionX,
        position: "absolute"
      }}
    >
      <div className="drop-dropdown-remove" onClick={() => removeElement(id)}>
        <i class="fa fa-close"></i>
      </div>
      <input
        className="drop-dropdown-select"
        list="optionsValue"
        name="options"
        id="options"
        value={selectedValue}
        onChange={e => {
          changeSelectedValue(e);
        }}
      />
      <datalist id="optionsValue">
        <option value="Action" />
        <option value="Type Something here" />
        <option value="Something else" />
      </datalist>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  updateSelectedValue: data => dispatch(updateDropdownValueInStore(data))
});

export default connect(
  null,
  mapDispatchToProps
)(DropDownInDropZone);
