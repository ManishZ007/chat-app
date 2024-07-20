import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";

import styled from "styled-components";

import { Contacts } from "../components/Contacts";
import { Chat_Container } from "../components/Chat_Container";
import { Current_Chat_Person } from "../components/Current_Chat_Person";
import { Welcome } from "../components/Welcome";

export const Chat = () => {
  const socket = useRef();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [contacts, setContacts] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const checking = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        const currentData = await JSON.parse(
          localStorage.getItem("chat-app-user")
        );
        setCurrentUser(currentData);
      }
    };
    checking();
  }, []);

  useEffect(() => {
    const getConatcts = async () => {
      if (currentUser) {
        await axios
          .get(`http://localhost:8000/api/auth/allUser/${currentUser?._id}`)
          .then((res) => {
            setContacts(res.data);
          });
      }
    };
    getConatcts();
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io("http://localhost:8000");
      socket.current.emit("add-user", currentUser?._id);
    }
  }, [currentUser]);

  const changeChat = (user) => {
    setCurrentChat(user);
    setLoader(true);
  };

  return (
    <>
      <Container>
        <Contacts contacts={contacts} changeChat={changeChat} />
        {loader ? (
          <Chat_Container
            currentUser={currentUser}
            currentChat={currentChat}
            socket={socket}
          />
        ) : (
          <Welcome />
        )}
        <Current_Chat_Person currentUser={currentUser} />{" "}
        {/* create welcome page section */}
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;
`;
