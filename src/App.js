import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./reducers";
import Grid from "./components/grid";
import styled from "styled-components";
import GridInterface from "./components/grid-interface";
const store = createStore(reducer);

const MainContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  box-sizing: border-box;
  height: 100vh;
  padding: 50px;
  background-color: #eee2dc;
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
