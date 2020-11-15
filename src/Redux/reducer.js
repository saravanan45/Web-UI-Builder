import { v4 as uuidv4 } from "uuid";

const initialState = JSON.parse(localStorage.getItem("elements")) || {
  elements: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATEELEMENTS": {
      // const tempstate = { ...state };
      // tempstate.elements = action.data;
      // localStorage.setItem("elements", JSON.stringify(tempstate));
      // return tempstate;
      return {
        ...state,
        elements: action.data
      };
    }
    case "UPDATETEXT": {
      return {
        ...state,
        elements: state.elements.map(element => {
          if (element.id == action.data.id) {
            element.heading = action.data.heading;
            element.paragraph = action.data.paragraph;
          }
          return element;
        })
      };
    }
    case "UPDATEELEMENTPOSITION": {
      return {
        ...state,
        elements: state.elements.map(element => {
          if (element.id == action.data.id) {
            element.positionX = action.data.positionX;
            element.positionY = action.data.positionY;
          }
          return element;
        })
      };
    }
    case "UPDATEDROPDOWNSELECTEDVALUE": {
      return {
        ...state,
        elements: state.elements.map(element => {
          if (element.id == action.data.id) {
            element.selectedValue = action.data.selectedValue;
          }
          return element;
        })
      };
    }
    default:
      return state;
  }
};

export default reducer;
