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
      <SChat href="http://wetube-phenomenonlee.shop/socket">채팅방</SChat>
      <LogoutBtn onClick={logout}>로그아웃</LogoutBtn>
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
  border: 1px solid gray;
  height: 120px;
  background-color: #fff;
`;

const SLogo = styled.div`
  cursor: pointer;
  padding: 10px;
  margin-left: 10px;
  width: 100px;
  height: 100px;
  background-image: url("/assets/images/heylogo.png");
  background-size: cover;
`;

const SChat = styled.a`
  cursor: pointer;
  background-color: #fff;
`;

const LogoutBtn = styled.button`
  border: 1px solid red;
  border-radius: 5px;
  margin-right: 10px;
  background-color: red;
  color: #fff;
  padding: 3px;
`;
