import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const mapDispatchToProps = dispatch => ({
  tickCycle: () =>
    dispatch({
      type: "INCREMENT_CYCLE"
    }),
  changeGridMatrix: (rows, cols) =>
    dispatch({
      type: "CREATE_NEW_MATRIX",
      rows,
      cols
    }),
  clearGrid: () =>
    dispatch({
      type: "CLEAR_GRID"
    }),
  randomizeMatrix: () =>
    dispatch({
      type: "RANDOMIZE_GRID"
    })
});

const GridInterface = ({
  tickCycle,
  changeGridMatrix,
  clearGrid,
  randomizeMatrix
}) => {
  const [automate, setAutomate] = useState(false);

  const handleClick = () => {
    setAutomate(state => !state);
  };

  useEffect(() => {
    if (automate) {
      const id = setInterval(() => tickCycle(), 100);
      return () => clearInterval(id);
    }
  }, [automate, tickCycle]);

  const handleChange = e => changeGridMatrix(...JSON.parse(e.target.value));

  const InterfaceContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 7%;
    border: 1px solid black;
    > * {
      margin: 10px;
    }
  `;

  return (
    <InterfaceContainer>
      <select id="change-matrix" onChange={handleChange}>
        <option disabled selected>
          Change grid matrix
        </option>
        <option value={"[20, 20]"}>20 x 20</option>
        <option value={"[20, 30]"}>20 x 30</option>
        <option value={"[20, 40]"}>20 x 40</option>
        <option value={"[30, 20]"}>30 x 20</option>
        <option value={"[30, 30]"}>30 x 30</option>
        <option value={"[30, 40]"}>30 x 40</option>
      </select>

      <button onClick={handleClick}>{automate ? "STOP" : "START"}</button>
      <button onClick={() => clearGrid()}>CLEAR GRID</button>
      <button onClick={() => randomizeMatrix()}>RANDOM MATRIX</button>
    </InterfaceContainer>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(GridInterface);
