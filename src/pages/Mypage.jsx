import Layout from "../components/Layout";
import styled from "styled-components";

const Mypage = () => {
  return (
    <Layout>
      {/* <Header /> */}
      <h1>MyPage</h1>
      <ContainerStyale>
        <PostsBoxStyle>
          <h1>Title</h1>
          <p>멍멍이</p>
          <h4>짧은 내용</h4>
          <p>❤️</p>
          <p>2030-08-01</p>
        </PostsBoxStyle>
        <PostsBoxStyle>
          <h1>Title</h1>
          <p>멍멍이</p>
          <h4>짧은 내용</h4>
          <p>❤️</p>
          <p>2030-08-01</p>
        </PostsBoxStyle>
        <PostsBoxStyle>
          <h1>Title</h1>
          <p>멍멍이</p>
          <h4>짧은 내용</h4>
          <p>❤️</p>
          <p>2030-08-01</p>
        </PostsBoxStyle>
      </ContainerStyale>
    </Layout>
  );
};
const ContainerStyale = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap:20px;
  margin-top: 20px;
`

const PostsBoxStyle = styled.div`
  border: 1px solid lightgray;
  width: 90% ;
  height: 100px;

`

export default Mypage;
