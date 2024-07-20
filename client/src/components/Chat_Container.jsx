import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import styled from "styled-components";

export const Chat_Container = ({ currentUser, currentChat, socket }) => {
  const [input, setInput] = useState("");
  const [projectingMsg, setProjectingMsg] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    const getcurrentChat = async () => {
      await axios
        .post(`http://localhost:8000/api/messages/getmsg`, {
          from: currentUser?._id,
          to: currentChat?._id,
        })
        .then((res) => {
          setProjectingMsg(res.data?.projectedMessage);
        });
    };

    getcurrentChat();
  }, [currentChat]);

  const handleClick = async () => {
    socket.current.emit("send-msg", {
      from: currentUser?._id,
      to: currentChat?._id,
      message: input,
    });

    const msgs = [...projectingMsg];
    msgs.push({ fromSelf: true, message: input });
    setProjectingMsg(msgs);

    await axios
      .post(`http://localhost:8000/api/messages/addmsg`, {
        from: currentUser?._id,
        to: currentChat?._id,
        message: input,
      })
      .then(setInput(""));
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setProjectingMsg((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [projectingMsg]);

  return (
    <>
      <Container>
        <div className="chatContainer">
          <header>
            <div className="profilePic"></div>
            <p>{currentChat.username}</p>
          </header>
          <div className="Chat">
            {projectingMsg?.map((msg) => {
              return (
                <div
                  ref={scrollRef}
                  key={uuidv4()}
                  className={msg?.fromSelf ? "sender" : "recive"}
                >
                  <p>{msg?.message}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="sendMessage">
          <input
            type="text"
            placeholder="Message"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />

          <button onClick={handleClick}>Send</button>
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 55%;
  background-color: #ffffff;
  .chatContainer {
    height: calc(100vh - 70px);
    width: 823px;
    background-color: rgb(230 230 230);
    header {
      width: 823px;
      padding: 10px;
      display: flex;
      align-items: center;
      gap: 1.2rem;
      .profilePic {
        height: 50px;
        width: 50px;
        border-radius: 50%;
        background-color: #3f3fefcf;
      }
    }
    .Chat {
      height: 598px;
      width: 823px;
      padding: 0px;
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
      overflow: scroll;
      .sender {
        text-align: end;
        transform: translateX(-30px);
        padding: 10px;
      }
      .recive {
        text-align: start;
        transform: translateX(30px);
      }
    }
  }

  .sendMessage {
    position: absolute;
    bottom: 0;
    width: 823px;
    height: 70px;
    background-color: rgb(230 230 230);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    input {
      padding: 15px;
      width: 60%;
      border-radius: 10px;
      border: 0;
      outline: 0;
      font-size: 17px;
    }
    button {
      padding: 15px;
      width: 80px;
      border-radius: 10px;
      border: 0;
      outline: 0;
      transition: 0.5s;
      background-color: #3f3fefcf;
      font-size: 17px;
      &:hover {
        transform: scale(0.9);
      }
    }
  }
`;
