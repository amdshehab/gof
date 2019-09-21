import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import CellComponent from "../cell";
import { useCheckGridChanges } from "../../hooks/useCheckGridChanges";

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

  const gridChanges = useCheckGridChanges(JSON.stringify(grid));

  useEffect(() => {
    batchToggleActive(gridChanges);
  }, [cycle]);

  useEffect(() => {
    if (automate) {
      const id = setInterval(() => tickCycle(), 100);
      return () => clearInterval(id);
    }
  }, [automate, tickCycle]);

  return (
    <>
      <Table>
        <tbody>
          {grid.map((row, i) => (
            <tr key={i}>
              {row.map((x, z) => (
                <CellComponent
                  isActive={x.isActive}
                  toggleActive={() => toggleActive([i, z])}
                  key={x.id}
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
