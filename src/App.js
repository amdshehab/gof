import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./reducers";
import Grid from "./components/grid";
import styled from "styled-components";
import GridInterface from "./components/grid-interface";
const store = createStore(reducer);

const MainContainer = styled.div`
  height: 100vh;
  background-color: #eee2dc;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

function App() {
  return (
    <MainContainer>
      <Provider store={store}>
        <Grid></Grid>
        <GridInterface></GridInterface>
      </Provider>
    </MainContainer>
  );
}

export default App;
