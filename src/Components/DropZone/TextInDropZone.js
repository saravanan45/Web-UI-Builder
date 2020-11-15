import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateTextInStore } from "../../Redux/actions";
import _ from "lodash";
import { useDrag } from "react-dnd";
import { ItemsClone } from "../../Utils/Constants";

const TextInDropZone = ({
  updateText,
  removeElement,
  positionX,
  positionY,
  heading,
  paragraph,
  id
}) => {
  const [text, setText] = useState({ heading: "", paragraph: "" });
  useEffect(() => {
    if (heading !== text.heading) {
      setText({
        heading,
        paragraph
      });
    }
  }, [heading, paragraph]);

  const [{ isDragging }, textDrag] = useDrag({
    item: {
      type: ItemsClone.elements,
      key: "Button",
      id
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging
    })
  });

  const changeText = (e, key) => {
    const tempText = { ...text };
    if (key == "heading") {
      tempText.heading = e.target.innerHTML;
      const deBounceText = _.debounce(updateText, 2000);
      deBounceText({
        heading: tempText.heading,
        paragraph: tempText.paragraph,
        id
      });
      return;
    }
    tempText.paragraph = e.target.innerHTML;
    const deBounceText = _.debounce(updateText, 4000);
    deBounceText({
      heading: tempText.heading,
      paragraph: tempText.paragraph,
      id
    });
    return;
  };
  return (
    <div
      ref={textDrag}
      className="drop-text-container"
      style={{ top: positionY, left: positionX, position: "absolute" }}
    >
      <div className="drop-text-remove" onClick={() => removeElement(id)}>
        <i class="fa fa-close"></i>
      </div>
      <h2
        className="drop-text-header"
        onInput={e => changeText(e, "heading")}
        contentEditable
        suppressContentEditableWarning
      >
        {text.heading}
      </h2>
      <p
        className="drop-text-paragraph"
        contentEditable
        suppressContentEditableWarning={true}
        onInput={e => changeText(e, "paragraph")}
      >
        {text.paragraph}
      </p>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  updateText: data => dispatch(updateTextInStore(data))
});

export default connect(
  null,
  mapDispatchToProps
)(TextInDropZone);
