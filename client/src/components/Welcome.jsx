import React from "react";
import styled from "styled-components";

export const Welcome = () => {
  return (
    <>
      <Container>
        <h1>Welcome On Chat App</h1>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 55%;
  padding: 10px;
  background-color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 30px;
`;
