import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//pages
import { Chat } from "./pages/Chat";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
