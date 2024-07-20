import React from "react";
import styled from "styled-components";

export const Contacts = ({ contacts, changeChat }) => {
  const handleChatChange = (user) => {
    changeChat(user);
  };

  return (
    <>
      <Container>
        <h1 className="header">Your Contacts</h1>

        {contacts?.map((user, index) => {
          return (
            <div
              className="contact-card"
              key={index}
              onClick={() => handleChatChange(user)}
            >
              <div className="profile-pic"></div>

              <p>{user?.username}</p>
            </div>
          );
        })}
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 25%;
  padding: 10px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  .header {
    font-size: 30px;
  }
  .contact-card {
    padding: 10px;
    background-color: rgb(230 230 230);
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
    transition: 0.5s;
    &:hover {
      transform: scale(0.9);
    }
    .profile-pic {
      height: 50px;
      width: 50px;
      border-radius: 50%;
      background-color: #3f3fefcf;
    }

    p {
      font-size: 17px;
      &::first-letter {
        text-transform: uppercase;
      }
    }
  }
`;
