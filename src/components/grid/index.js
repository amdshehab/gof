import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import CellComponent from "../cell";

const mapStateToProps = ({
  gridReducer: { grid },
  cycleReducer: { cycle }
}) => {
  return {
    grid,
    cycle
  };
};

const mapDispatchToProps = dispatch => ({
  toggleActive: indexMap =>
    dispatch({
      type: "TOGGLE_ACTIVE",
      indexMap
    }),
  tickCycle: () =>
    dispatch({
      type: "INCREMENT_CYCLE"
    })
});

const Table = styled.table`
  margin: 0 auto;
  border-collapse: collapse;
  border: 1px solid black;
`;

const GridManager = ({ grid, cycle, toggleActive, tickCycle }) => {
  const handleClick = () => {
    tickCycle();
  };

  const checkSurroundings = (i, n, grid) => {
    let top,
      bottom,
      right,
      left,
      topRight,
      topLeft,
      bottomRight,
      bottomLeft = null;

    if (i !== 0) {
      top = grid[i + 1][n];
      topRight = grid[i + 1][n + 1];
      topLeft = grid[i + 1][n - 1];
    }

    if (i !== grid.length - 1) {
      bottom = grid[i - 1][n];
      bottomRight = grid[i - 1][n + 1];
      bottomLeft = grid[i - 1][n - 1];
    }

    if (n !== grid[i].length - 1) {
      right = grid[i][n + 1];
    }

    if (n !== 0) {
      left = grid[i][n - 1];
    }

    return {
      top,
      bottom,
      right,
      left,
      topRight,
      topLeft,
      bottomRight,
      bottomLeft
    };
  };

  const checkForChanges = () => {
    for (let i = 0; i < grid.length; i++) {
      for (let n = 0; n < grid[i].length; n++) {
        const cell = grid[i][n];
        console.log(checkSurroundings(i, n, grid));
      }
    }
  };

  useEffect(() => {
    checkForChanges();
  });

  return (
    <>
      <Table>
        <tbody>
          {grid.map((row, i) => (
            <tr key={i}>
              {row.map((x, z) => (
                <CellComponent isActive={x.isActive} key={z}></CellComponent>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <button onClick={handleClick}>CLICK ME</button>
    </>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GridManager);
