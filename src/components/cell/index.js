import React from "react";
import styled from "styled-components";

const Column = styled.td`
  padding: 0.5rem;
  border: 0.1rem solid black;
  background-color: ${({ isActive }) => (isActive ? "blue" : "white")};
`;

const CellComponent = ({ isActive, toggleActive }) => (
  <Column isActive={isActive} onClick={() => toggleActive()} />
);

export default React.memo(CellComponent, (prev, next) => {
  return prev.isActive === next.isActive;
});
