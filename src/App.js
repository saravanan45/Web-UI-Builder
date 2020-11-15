import React, { useState } from "react";
import "./App.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./Redux/reducer";
import Element from "./Components/Elements";

function App() {
  const store = createStore(reducer);

  store.subscribe(() => {
    localStorage.setItem("elements", JSON.stringify(store.getState()));
  });
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <Element />
      </DndProvider>
    </Provider>
  );
}

export default App;
