import Layout from "../components/Layout";
import Comments from "../components/Comments";
import { Navigate, useNavigate } from "react-router-dom";

import styled from "styled-components";
const Detail = () => {
  const navigate = useNavigate();

  return (
    <>
    <Layout>
          {/* <Header />  */}
      <div><h1 onClick={() => {
        navigate("/main")
      }}>🌈</h1>
        <ContentStyled>
          <div>
        <p>2022-08-01</p>
        <p>멍멍이 님의 글</p>
        <TitleStyle>개와 고양이랑 싸울때?!</TitleStyle>
        <div>
        </div>
        </div>
        <h4>내비둔다.</h4>
        <h1>❤️</h1>
        <p>1000</p>
        </ContentStyled>


      </div>
      <ButtonGroup>
      <ButtonStyle>수정버튼</ButtonStyle>
      <ButtonStyle onClick={() => {
        navigate("/main")
      }}>목록버튼</ButtonStyle>
      <ButtonStyle>삭제버튼</ButtonStyle>
      </ButtonGroup>
      <Comments />
    </Layout>
    </>
  );
};

const ContentStyled = styled.div`
  border: 1px solid lightgray;
  width: 100%;
  height: 60em;
`
const TitleStyle = styled.h1`
  
`;
const ButtonStyle = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;

    width:15%;
    height: 30px;
    background-color: lightgray;
    border-radius: 3px;
`
const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`
export default Detail;
