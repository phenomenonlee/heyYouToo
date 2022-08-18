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
      <SChat href="http://wetube-phenomenonlee.shop/socket"></SChat>
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
  border-bottom: none;
  height: 120px;
  background-color: skyblue;
`;

const SLogo = styled.div`
  cursor: pointer;
  padding: 10px;
  margin-left: 10px;
  width: 150px;
  height: 50px;
  background-image: url("/assets/images/logo.png");
  background-size: cover;
  border-radius: 5px;
`;

const SChat = styled.a`
  cursor: pointer;
  background-color: skyblue;
  color: red;
  background: url("https://www.starbucks.co.kr/common/img/common/icon_user_m.png");
  background-size: cover;
  height: 30px;
  left: 18px;
  top: 14px;
  width: 25px;
  margin-right: 25px;
`;

const LogoutBtn = styled.button`
  border-radius: 5px;
  margin-right: 10px;
  background-color: red;
  color: #fff;
  padding: 3px;
  font-weight: bold;

  &:hover {
    background-color: #fff;
    color: red;
  }
`;
