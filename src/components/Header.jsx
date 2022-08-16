import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { removeCookie } from "../util/cookie";

const Header = () => {
  const navigate = useNavigate();
  const logout = () => {
    removeCookie("token");
    navigate("/");
  };
  return (
    <SHeader>
      <SLogo onClick={() => navigate("/")}></SLogo>
      <button onClick={logout}>로그아웃</button>
    </SHeader>
  );
};

export default Header;

const SHeader = styled.header`
  position: fixed;
  max-width: 700px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  justify-content: space-between;
  border: 2px solid black;
  height: 120px;
`;

const SLogo = styled.div`
  cursor: pointer;
  padding: 10px;
  margin-left: 10px;
  width: 100px;
  height: 100px;
  border: 2px solid blue;
  background-image: url("/assets/images/heylogo.png");
  background-size: cover;
`;
