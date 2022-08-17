// import Layout from "../components/Layout";
// import styled from "styled-components";
// import React, { useState } from "react";
// import axios from "axios";
// import Header from "../components/Header";
// import { useNavigate } from "react-router-dom";

// const Signup = () => {
//   const [userId, setUserId] = useState("");
//   const [nickname, setnickname] = useState("");
//   const [userPw, setUserPw] = useState("");
//   const [confirmUserPw, setConfirmUserPw] = useState("");

//   const [data, setData] = useState({
//     id: "",
//     password: "",
//     confirmPw: "",
//     nickName: "",
//   });

//   const navigate = useNavigate();

//   const [userIdError, setUserIdError] = useState(false);
//   const [nicknameError, setnicknameError] = useState(false);
//   const [userPwError, setuserPwError] = useState(false);
//   const [confirmPwError, setConfirmPwError] = useState(false);

//   const onChangeUserId = (e) => {
//     const userIdRegex =
//       /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
//     if (!e.target.value || userIdRegex.test(e.target.value))
//       setUserIdError(false);
//     else setUserIdError(true);
//     setUserId(e.target.value);
//     setData({ ...data, id: e.target.value });
//   };

//   const onChangenickname = (e) => {
//     const nicknameRegex = /^[a-zA-Zㄱ-힣0-9-_.]{2,12}$/;
//     if (!e.target.value || nicknameRegex.test(e.target.value))
//       setnicknameError(false);
//     else setnicknameError(true);
//     setnickname(e.target.value);
//     setData({ ...data, nickName: e.target.value });
//   };

//   const onChangePw = (e) => {
//     const passwordRegex =
//       /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%*#?&])[A-Za-z\d@!%*#?&]{4,13}$/;
//     if (!e.target.value || passwordRegex.test(e.target.value))
//       setuserPwError(false);
//     else setuserPwError(true);

//     if (!confirmUserPw || e.target.value === confirmUserPw)
//       setConfirmPwError(false);
//     else setConfirmPwError(true);
//     setUserPw(e.target.value);
//     setData({ ...data, password: e.target.value });
//   };

//   const onChangeConfirmPw = (e) => {
//     if (userPw === e.target.value) setConfirmPwError(false);
//     else setConfirmPwError(true);
//     setConfirmUserPw(e.target.value);
//     setData({ ...data, confirmPw: e.target.value });
//   };

//   console.log(data);

//   const onSubmitHandler = async () => {
//     if (!userId) setUserIdError(true);
//     if (!nickname) setnicknameError(true);
//     if (!userPw) setuserPwError(true);
//     if (!confirmUserPw) setConfirmPwError(true);

//     // if (userId && nickname && userPw && confirmUserPw) return true;
//     if (!userId || !nickname || !userPw || !confirmUserPw) {
//       return alert("제대로 입력해주세요");
//     }
//     // if (userIdError) return;
//     // if (nicknameError) return;
//     // if (userPwError) return;
//     // if (confirmPwError) return;
//     if (!userId && !nickname && !userPw && !confirmUserPw) {
//       return alert("무엇이라도 적으시오");
//     }

//     // console.log(data);
//     try {
//       const response = await axios.post(
//         "http://wetube-phenomenonlee.shop/api/users/join",
//         data
//       );
//       console.log(response);
//       alert("회원가입하셨습니다");
//     } catch (err) {
//       console.log(err);
//       alert("회원가입실패했습니다");
//     }
//     // await axios.post("http://wetube-phenomenonlee.shop/api/users/join", data);
//     // .then((response) => {
//     //   if (response.data.result === true) {
//     //   navigate("/");
//     //   }
//     // });
//   };
//   return (
//     <Layout>
//       <Header />
//       <BodyStyle>
//         <h1> 회원가입 </h1>
//         <ContainerStyle>
//           <SingUpBoxStyle>
//             <ContentStyle>
//               <EmailCheckStyle>
//                 <input
//                   type="email"
//                   value={userId}
//                   onChange={onChangeUserId}
//                   placeholder="ex22@gef.com"
//                 />
//                 <RepeatButton>중복확인</RepeatButton>
//               </EmailCheckStyle>
//               {userIdError && (
//                 <SignupInput>이메일 형식으로 다시 써주세요</SignupInput>
//               )}
//               <input
//                 type="text"
//                 value={nickname}
//                 // minLength={4}
//                 // maxLength={12}
//                 onChange={onChangenickname}
//                 placeholder="닉네임"
//               />
//               {nicknameError && (
//                 <SignupInput>4~12글자로 다시 써주세요</SignupInput>
//               )}
//               <input
//                 type="password"
//                 value={userPw}
//                 onChange={onChangePw}
//                 placeholder={"비밀번호"}
//               />
//               {userPwError && (
//                 <SignupInput>영문 및 숫자 조합으로 다시써주세요</SignupInput>
//               )}
//               <input
//                 type="password"
//                 value={confirmUserPw}
//                 onChange={onChangeConfirmPw}
//                 placeholder={"비밀번호 재입력"}
//               />
//               {confirmPwError && (
//                 <SignupInput>비밀번호가 일치하지 않습니다</SignupInput>
//               )}
//             </ContentStyle>
//             <ButtonGroup>
//               <SignupButton onClick={onSubmitHandler}>회원가입</SignupButton>
//               <CanButton onClick={() => navigate("/")}>취소</CanButton>
//             </ButtonGroup>
//           </SingUpBoxStyle>
//         </ContainerStyle>
//       </BodyStyle>
//     </Layout>
//   );
// };
// const BodyStyle = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   line-height: 8em;
// `;
// const ContainerStyle = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 340px;
//   height: 65vh;
//   padding: 1.2rem;
//   box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
//   border-radius: 0.3rem;
//   background: linear-gradient(#9db8bf, #9ccddb5e);
// `;

// const ContentStyle = styled.div`
//   display: flex;
//   flex-direction: column;
//   input {
//     border: 2px solid white;
//     border-radius: 5px;
//     margin: 10px 20px;
//     height: 35px;
//     width: 15em;
//   }
// `;

// const SingUpBoxStyle = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;

//   margin-top: 50px;
// `;

// const EmailCheckStyle = styled.div`
//   display: flex;
// `;

// const ButtonGroup = styled.div`
//   display: flex;
//   flex-direction: row;
//   margin-top: 20px;
//   button {
//     width: 100px;
//     height: 20px;
//   }
//   gap: 10px;
// `;
// const RepeatButton = styled.button`
//   color: #fff;
//   border-color: gray;
//   border-radius: 5px;
//   background-color: tomato;
//   height: 20px;
//   width: 70px;
//   margin-top: 17px;
// `;

// const SignupButton = styled.button`
//   color: #fff;
//   border-color: gray;
//   border-radius: 5px;
//   background-color: tomato;
// `;
// const CanButton = styled.button`
//   color: tomato;
//   border-color: tomato;
//   background-color: #fff;
//   border-radius: 5px;
// `;

// const SignupInput = styled.span`
//   color: red;
//   font-size: small;
//   line-height: 0em;
//   margin-left: 15px;
// `;

// export default Signup;
