import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/home/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [userinfo, setUserInfo] = useState({
    email: "",
    password: "",
    nickname: "",
  });

  const [inputEmail, setInputEmail] = useState("");
  const [inputPw, setInputPw] = useState("");

  // input data의 변화가 있을 때마다 value 값을 변경해서 useState 해준다.
  // const [isLogin, setIsLogin] = useState(false);

  const handleInputEmail = (e) => {
    setInputEmail(e.target.value); //(e) state를 바꿔줌 "" => e.target.value로
    console.log(inputEmail);
    //setUserInfo(userinfo.email=inputEmail)
  };
  const handleInputPw = (e) => {
    setInputPw(e.target.value);
    console.log(inputPw);
    //setUserInfo(userinfo.password=inputPw)
  };

  const onSubmitHandler = async (userinfo) => {
    console.log(inputEmail, inputPw);
    try {
      const response = await axios.post("http://3.34.47.211/api/login", {
        email: inputEmail,
        password: inputPw,
      });
      console.log(response);
      alert("로그인에 성공하셨습니다!");
    } catch (err) {
      console.log(err);
      alert("로그인에 실패하셨습니다!");
    }
  };

  // const onClickLogin = () => {
  // console.log('click login')
  // }

  // 페이지 렌더링 후 가장 처음 호출되는 함수
  // useEffect(() => {
  // axios.post('/login/user_inform')
  // .then(response => console.log(response))
  // .catch()
  // }, [])

  return (
    <>
      <Header />
      <Base>
        <Box>
          <BarTxt1>Login to your account</BarTxt1>
          <ContentBox>
            <Email>
              <input
                type="email"
                id="email"
                placeholder="E-mail"
                name="input_email"
                value={inputEmail}
                onChange={handleInputEmail}
              ></input>
            </Email>
            <PassWord>
              <input
                type="text"
                id="password"
                placeholder="PassWord"
                naeme="input_pw"
                value={inputPw}
                onChange={handleInputPw}
              ></input>
            </PassWord>
          </ContentBox>
          <Btn>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmitHandler(userinfo);
              }}
            >
              <LoginBtn
              // else if((state.id === '') || (state.pw === '')) {
              // setState({
              // id : '',
              // passwd : '',
              // error: '아이디와 비밀번호를 모두 입력해주세요',
              // })
              // }
              >
                {" "}
                Sign In{" "}
              </LoginBtn>
            </form>
            <br />
            <ToLoginBtn
              onClick={() => {
                navigate("/auth");
              }}
            >
              Would you like to Sign Up?
            </ToLoginBtn>
          </Btn>
        </Box>
      </Base>
    </>
  );
};

export default Login;
