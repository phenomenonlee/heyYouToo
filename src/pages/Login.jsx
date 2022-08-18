import Layout from "../components/Layout";
import Header from "../components/Header";
import styled from "styled-components";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setCookie } from "../util/cookie";

const Login = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [userIdError, setuserIdError] = useState(false);
  const [userPwError, setuserPwError] = useState(false);
  const [login, setLogin] = useState({
    id: "",
    password: "",
  });
  // const [cookies, setCookie] = useCookies(["token"]);

  const onChangeUserId = (e) => {
    const userIdRegex =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    if (!e.target.value || userIdRegex.test(e.target.value))
      setuserIdError(false);
    else setuserIdError(true);
    setUserId(e.target.value);
    setLogin({ ...login, id: e.target.value });
  };

  const onChangeUserPw = (e) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%*#?&])[A-Za-z\d@!%*#?&]{4,13}$/;
    if (!e.target.value || passwordRegex.test(e.target.value))
      setuserPwError(false);
    else setuserPwError(true);
    setUserPw(e.target.value);
    setLogin({ ...login, password: e.target.value });
  };

  const onSubmitHandler = async () => {
    await axios
      .post("http://wetube-phenomenonlee.shop/api/users/login", login)
      .then((response) => {
        setCookie("token", response.data.token, {
          path: "/",
          secure: true,
          sameSite: "none",
        });
        navigate("/main");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Layout>
      <SWrapper>
        <Header />
        <SMain>
          <SLoginBox>
            <SIdInput
              placeholder="아이디"
              value={userId}
              onChange={onChangeUserId}
            />
            {userIdError && <SignupInput>이메일 형식으로 써주세요</SignupInput>}
            <SPwInput
              placeholder="패스워드"
              type="password"
              minLength={8}
              value={userPw}
              onChange={onChangeUserPw}
            />
            {userPwError && (
              <SignupInput>비밀번호는 8자리 이상입니다</SignupInput>
            )}
            <SLoginBtnSet>
              <LoginBtn onClick={onSubmitHandler}>로그인</LoginBtn>
              <SignupBtn onClick={() => navigate("/signup")}>
                회원가입
              </SignupBtn>
            </SLoginBtnSet>
          </SLoginBox>
        </SMain>
      </SWrapper>
    </Layout>
  );
};

export default Login;

const SWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const SMain = styled.div`
  width: 100%;
  height: calc(100% - 120px);
  padding: 10px;
  flex-direction: column;
  align-items: center;
  display: flex;
  margin-top: 120px;
  border-top: none;
  justify-content: center;
  background-color: #fff;
`;

const SLoginBox = styled.div`
  width: 600px;
  height: 400px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  align-items: center;
  justify-content: center;
  background-color: skyblue;
  opacity: 90%;
`;

const SIdInput = styled.input`
  width: 400px;
  height: 40px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  border-radius: 5px;
  background-color: #fff;
`;
const SPwInput = styled.input`
  margin-top: 30px;
  width: 400px;
  height: 40px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  border-radius: 5px;
  background-color: #fff;
`;

const SLoginBtnSet = styled.div`
  justify-content: space-between;
  flex-direction: row;
  display: flex;
  margin-top: 50px;
  gap: 40px;
  background-color: skyblue;
`;

const LoginBtn = styled.button`
  background-color: red;
  color: white;
  width: 150px;
  height: 30px;
  border-radius: 5px;
  font-weight: bold;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
`;

const SignupBtn = styled.button`
  background-color: #fff;
  color: red;
  border: 1px solid red;
  width: 150px;
  height: 30px;
  border-radius: 5px;
  font-weight: bold;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
`;

const SignupInput = styled.span`
  color: red;
  font-size: small;
  line-height: 0em;
  margin-left: 15px;
  margin-top: 10px;
  font-weight: bold;
`;
