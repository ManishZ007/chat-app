import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export const Login = () => {
  const navigate = useNavigate();
  const [inputs, setInput] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleClick = async () => {
    const { email, password } = inputs;

    await axios
      .post("http://localhost:8000/api/auth/login", {
        email,
        password,
      })
      .then((res) => {
        if (res.data.status) {
          localStorage.setItem("chat-app-user", JSON.stringify(res.data.user));
          navigate("/");
        } else {
          alert(res.data.message);
        }
      });
  };

  return (
    <>
      <Component>
        <div className="mainCard">
          <h1 className="cardHeader">Create and account</h1>
          <div className="inputBox">
            <p>Email</p>
            <input
              type="text"
              placeholder="email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
            />
            <p>Passowrd</p>
            <input
              type="password"
              placeholder="password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
            />
          </div>
          <div className="submitButton">
            <button onClick={handleClick}>Login</button>
          </div>

          <div className="option">
            <p>
              Don’t have an account yet?
              <span onClick={() => navigate("/register")}> Sign up</span>
            </p>
          </div>
        </div>
      </Component>
    </>
  );
};

const Component = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9fafb;
  .mainCard {
    padding: 20px;
    border-radius: 20px;
    background-color: #fff;
    display: flex;
    align-items: start;
    gap: 2rem;
    flex-direction: column;
    .cardHeader {
      font-size: 30px;
    }
    .inputBox {
      padding: 10px;
      width: 400px;
      p {
        font-size: 17px;
        margin: 10px 0px;
      }
      input {
        padding: 10px;
        width: 90%;
        border-radius: 10px;
        font-size: 17px;
      }
    }
    .submitButton {
      padding: 10px;
      width: 400px;
      button {
        width: 100%;
        padding: 10px;
        border-radius: 10px;
        border: none;
        outline: none;
        background-color: #2563eb;
        color: white;
        font-size: 17px;
      }
    }

    .option {
      padding: 10px;
      width: 400px;
      p {
        font-size: 17px;
        span {
          color: #2563ee;
          cursor: pointer;
        }
      }
    }
  }
`;
