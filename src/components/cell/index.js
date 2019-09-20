import React from "react";
import styled from "styled-components";

const Column = styled.td`
  padding: 0.5rem;
  border: 0.1rem solid black;
  background-color: ${({ isActive }) => (isActive ? "blue" : "white")};
`;

export default ({ isActive, indexMap, toggleActive }) => (
  <Column isActive={isActive} onClick={() => toggleActive(indexMap)} />
);
