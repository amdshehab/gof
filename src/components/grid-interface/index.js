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
    })
});

const GridInterface = ({ tickCycle, changeGridMatrix }) => {
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

  const handleChange = e => {
    console.log(e.target.value);
    changeGridMatrix(...JSON.parse(e.target.value));
  };

  const InterfaceContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 200px;
    border: 1px solid black;
  `;

  return (
    <InterfaceContainer>
      <span>Change Matrix:</span>
      <select id="change-matrix" onChange={handleChange}>
        <option value={"[20, 20]"}>20 x 20</option>
        <option value={"[20, 30]"}>20 x 30</option>
        <option value={"[20, 40]"} selected>
          20 x 40
        </option>
        <option value={"[30, 20]"}>30 x 20</option>
        <option value={"[30, 30]"}>30 x 30</option>
        <option value={"[30, 40]"}>30 x 40</option>
      </select>

      <button onClick={handleClick}>START</button>
    </InterfaceContainer>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(GridInterface);
