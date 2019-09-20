import React from "react";
import styled from "styled-components";

const Column = styled.td`
  padding: 0.5rem;
  border: 0.1rem solid black;
`;

export default ({ isActive, indexMap, toggleActive }) => {
  return (
    <Column onClick={() => toggleActive(indexMap)}>{isActive + ""}</Column>
  );
};
