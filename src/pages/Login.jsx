// import Layout from "../components/Layout";
// import Header from "../components/Header";
// import styled from "styled-components";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import axios from "axios";
// import { setCookie } from "../util/cookie";

// // import { useCookies } from "react-cookie";
// // import { setCookie, getCookie } from "../util/cookie";

// const Login = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [userId, setUserId] = useState("");
//   const [userPw, setUserPw] = useState("");
//   const [userIdError, setuserIdError] = useState(false);
//   const [userPwError, setuserPwError] = useState(false);
//   const [login, setLogin] = useState({
//     id: "",
//     password: "",
//   });
//   // const [cookies, setCookie] = useCookies(["token"]);

//   const onChangeUserId = (e) => {
//     const userIdRegex =
//       /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
//     if (!e.target.value || userIdRegex.test(e.target.value))
//       setuserIdError(false);
//     else setuserIdError(true);
//     setUserId(e.target.value);
//     setLogin({ ...login, id: e.target.value });
//   };

//   const onChangeUserPw = (e) => {
//     const passwordRegex =
//       /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%*#?&])[A-Za-z\d@!%*#?&]{4,13}$/;
//     if (!e.target.value || passwordRegex.test(e.target.value))
//       setuserPwError(false);
//     else setuserPwError(true);
//     setUserPw(e.target.value);
//     setLogin({ ...login, password: e.target.value });
//   };

//   // axios.defaults.withCredentials = true;

//   // const initialOpt = {
//   //   sameSite: "none",
//   // };
//   const onSubmitHandler = async () => {
//     await axios
//       .post("http://wetube-phenomenonlee.shop/api/users/login", login)
//       .then((response) => {
//         setCookie("token", response.data.token, {
//           path: "/",
//           secure: true,
//           sameSite: "none",
//         });
//         // console.log(result);
//         // const { token } = result.data;
//         // document.cookie = `_y7o12=${token}`;
//         navigate("/main");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   return (
//     <Layout>
//       <SWrapper>
//         <Header />
//         <SMain>
//           <SLoginBox>
//             <SIdInput
//               placeholder="id"
//               value={userId}
//               onChange={onChangeUserId}
//             />
//             {userIdError && <SignupInput>이메일 형식으로 써주세요</SignupInput>}
//             <SPwInput
//               placeholder="password"
//               minLength={8}
//               value={userPw}
//               onChange={onChangeUserPw}
//             />
//             {userPwError && (
//               <SignupInput>비밀번호는 8자리 이상입니다</SignupInput>
//             )}
//             <SLoginBtnSet>
//               <LoginBtn onClick={onSubmitHandler}>로그인</LoginBtn>
//               <SignupBtn onClick={() => navigate("/signup")}>
//                 회원가입
//               </SignupBtn>
//             </SLoginBtnSet>
//           </SLoginBox>
//         </SMain>
//       </SWrapper>
//     </Layout>
//   );
// };

// export default Login;

// const SWrapper = styled.div`
//   position: relative;
//   height: 100%;
//   width: 100%;
//   overflow: hidden;
// `;

// const SMain = styled.div`
//   width: 100%;
//   height: calc(100% - 120px);
//   padding: 10px;
//   border: 2px solid black;
//   flex-direction: column;
//   align-items: center;
//   display: flex;
//   margin-top: 120px;
//   border-top: none;
//   justify-content: center;
// `;

// const SLoginBox = styled.div`
//   width: 600px;
//   height: 400px;
//   display: flex;
//   flex-direction: column;
//   border-radius: 10px;
//   box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
//   align-items: center;
//   justify-content: center;
// `;

// const SIdInput = styled.input`
//   width: 400px;
//   height: 40px;
//   box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
//   border-radius: 5px;
// `;
// const SPwInput = styled.input`
//   margin-top: 30px;
//   width: 400px;
//   height: 40px;
//   box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
//   border-radius: 5px;
// `;

// const SLoginBtnSet = styled.div`
//   justify-content: space-between;
//   flex-direction: row;
//   display: flex;
//   margin-top: 50px;
//   gap: 40px;
// `;

// const LoginBtn = styled.button`
//   background-color: red;
//   color: white;
//   width: 150px;
//   height: 30px;
//   border-radius: 5px;
//   font-weight: bold;
// `;

// const SignupBtn = styled.button`
//   background-color: #fff;
//   color: red;
//   border: 1px solid red;
//   width: 150px;
//   height: 30px;
//   border-radius: 5px;
//   font-weight: bold;
// `;

// const SignupInput = styled.span`
//   color: red;
//   font-size: small;
//   line-height: 0em;
//   margin-left: 15px;
//   margin-top: 10px;
// `;
