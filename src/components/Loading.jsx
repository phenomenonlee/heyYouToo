import React from "react";
import styled, { keyframes } from "styled-components";
// import image from "../../public/assets/images/logo.PNG";

const Loading = () => {
  return (
    <Background>
      <LoadingText>
        로딩중입니다
        {/* <Logo /> */}
      </LoadingText>
    </Background>
  );
};

const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #ffffffb7;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const LoadingText = styled.div`
  font: 1rem "Noto Sans KR";
  text-align: center;
  animation: ${boxFade} 2s 0s infinite linear alternate;
  background-image: url("/assets/images/logo.PNG");
`;

const boxFade = keyframes`
0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

// const Logo = styled.image`
//   border-radius: 50%;
//   border: 1px solid rgba(255, 204, 204, 0.5);
//   padding: 10px;
//   margin: 10px;
//   overflow: hidden;
//   width: 200px;
//   height: 200px;
//   animation: ${boxFade} 2s 0s infinite linear alternate;
//   background-image: url("/assets/images/logo.PNG");
// `;
export default Loading;
