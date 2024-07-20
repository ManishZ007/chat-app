import React from "react";
import styled from "styled-components";

export const Current_Chat_Person = ({ currentUser }) => {
  return (
    <>
      <Container>
        <div className="currentUserCard">
          <div className="currentUserProfilePic"></div>
          <div className="currentUserName">
            <p>{currentUser?.username}</p>
          </div>
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 20%;
  padding: 10px;
  background-color: #ffffff;

  .currentUserCard {
    transform: translateY(80px);
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1.7rem;
    .currentUserProfilePic {
      height: 100px;
      width: 100px;
      border-radius: 50%;
      background-color: #1464bf;
    }
    .currentUserName {
      p {
        font-size: 30px;
      }
    }
  }
`;
