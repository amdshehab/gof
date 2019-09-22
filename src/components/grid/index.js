import React, { useEffect } from "react";
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
    })
});

const Table = styled.table`
  table-layout: fixed;
  border-collapse: collapse;
  border: 1px solid black;
`;

const GridManager = ({ grid, cycle, toggleActive, batchToggleActive }) => {
  const gridChanges = useCheckGridChanges(JSON.stringify(grid));

  useEffect(() => {
    batchToggleActive(gridChanges);
  }, [cycle]);

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
    </>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GridManager);
