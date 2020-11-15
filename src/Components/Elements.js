import React from "react";
import DropContainer from "./DropContainer";
import Button from "./Button";
import Text from "./Text";
import DropDown from "./DropDown";
import { connect } from "react-redux";
import { updateElementsInStore } from "../Redux/actions";

function Elements({ elements, updateElements }) {
  const changeResultElements = data => {
    updateElements([...elements, data]);
  };

  const removeElement = id => {
    const modifiedElements = elements.filter(element => element.id !== id);
    updateElements(modifiedElements);
  };

  return (
    <div className="container">
      <div className="left-container">
        <Button />
        <Text />
        <DropDown />
      </div>
      <DropContainer
        changeResultElements={changeResultElements}
        elements={elements}
        removeElement={removeElement}
      />
    </div>
  );
}

const mapStateToProps = state => {
  console.log(state);
  return { elements: state.elements };
};

const mapDispatchToProps = dispatch => ({
  updateElements: data => dispatch(updateElementsInStore(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Elements);
