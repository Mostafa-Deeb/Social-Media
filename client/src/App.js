import "./App.css";
import { Container } from "@mui/material";
import React from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Auth from "./components/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

function App() {
  const user = JSON.parse(localStorage.getItem("profile"));
  console.log(user);
  return (
    <Container maxWidth="xl">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to={"/posts"} />}></Route>
        <Route path="/posts" element={<Main />} />
        <Route path="/posts/search" element={<Main />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route
          path="/Auth"
          element={user !== null ? <Navigate to={"/posts"} /> : <Auth />}
        ></Route>
      </Routes>
    </Container>
  );
}

export default App;
