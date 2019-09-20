import React, { useEffect, useCallback, useState } from "react";
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
  batchToggleActive: cellChanges =>
    dispatch({
      type: "BATCH_TOGGLE_ACTIVE",
      cellChanges
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

const GridManager = ({
  grid,
  cycle,
  toggleActive,
  batchToggleActive,
  tickCycle
}) => {
  const [automate, setAutomate] = useState(false);

  const handleClick = () => {
    setAutomate(state => !state);
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

    const gridRightConstraint = () => n !== grid[i].length - 1;
    const gridLeftConstraint = () => n !== 0;
    const gridTopConstraint = () => i !== 0;
    const gridBottomConstraint = () => i !== grid.length - 1;

    top = gridTopConstraint() && grid[i - 1][n].isActive;
    topRight =
      gridTopConstraint() &&
      gridRightConstraint() &&
      grid[i - 1][n + 1].isActive;
    topLeft =
      gridTopConstraint() &&
      gridLeftConstraint() &&
      grid[i - 1][n - 1].isActive;

    bottom = gridBottomConstraint() && grid[i + 1][n].isActive;
    bottomRight =
      gridBottomConstraint() &&
      gridRightConstraint() &&
      grid[i + 1][n + 1].isActive;
    bottomLeft =
      gridBottomConstraint() &&
      gridLeftConstraint() &&
      grid[i + 1][n - 1].isActive;

    right = gridRightConstraint() && grid[i][n + 1].isActive;

    left = gridLeftConstraint() && grid[i][n - 1].isActive;

    return [
      top,
      bottom,
      right,
      left,
      topRight,
      topLeft,
      bottomRight,
      bottomLeft
    ];
  };

  const determineCellActive = (cellActive, surroundingCells) => {
    const activeSurrounding = surroundingCells.filter(x => x === true).length;

    if (!cellActive && activeSurrounding === 3) return true;

    if (cellActive && activeSurrounding <= 1) return false;

    if (cellActive && activeSurrounding >= 4) return false;

    if (cellActive && (activeSurrounding === 2 || activeSurrounding === 3)) {
      return true;
    }
    return false;
  };

  const checkForChanges = () => {
    const copyGrid = grid.slice();
    const gridChanges = [];
    for (let i = 0; i < copyGrid.length; i++) {
      for (let n = 0; n < copyGrid[i].length; n++) {
        const cell = copyGrid[i][n];
        const surroundingCells = checkSurroundings(i, n, grid);
        const nextCellState = determineCellActive(
          cell.isActive,
          surroundingCells
        );
        if (cell.isActive !== nextCellState) {
          gridChanges.push([i, n, nextCellState]);
        }
      }
    }
    return gridChanges;
  };

  const memoizeCheckGridChanges = useCallback(() => checkForChanges(), [grid]);

  useEffect(() => {
    const something = memoizeCheckGridChanges();
    batchToggleActive(something);
  }, [cycle]);

  useEffect(() => {
    if (automate) {
      const id = setInterval(() => tickCycle(), 200);
      return () => clearInterval(id);
    }
  }, [automate]);

  return (
    <>
      <Table>
        <tbody>
          {grid.map((row, i) => (
            <tr key={i}>
              {row.map((x, z) => (
                <CellComponent
                  isActive={x.isActive}
                  indexMap={[i, z]}
                  toggleActive={toggleActive}
                  key={z}
                ></CellComponent>
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
