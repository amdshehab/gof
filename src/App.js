import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./reducers";
import GridComponent from "./components/grid";

const store = createStore(reducer);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h2>hello</h2>
        <GridComponent></GridComponent>
      </div>
    </Provider>
  );
}

export default App;
