import React from "react";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Main from "../pages/Main";
import Detail from "../pages/Detail";
import Mypage from "../pages/Mypage";

import { BrowserRouter, Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/main" element={<Main />}></Route>
        <Route path="/detail" element={<Detail />}></Route>
        <Route path="/detail/:id" element={<Detail />}></Route>
        <Route path="/mypage" element={<Mypage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
