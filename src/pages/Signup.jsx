import Layout from "../components/Layout";
import styled from "styled-components";
const Signup = () => {
  return (
    <Layout>
            {/* <Header /> */}
      <BodyStyle>
     <h1> 회원가입 </h1>
      <ContainerStyle>
      <SingUpBoxStyle>
        <ContentStyle>
        <EmailCheckStyle>
        <input type={"text"} placeholder={"ex22@gef.com"}/>
        <button>중복확인</button>
        </EmailCheckStyle>
        <input type={"text"} placeholder={"닉네임"}/>
        <input type={"text"} placeholder={"비밀번호"}/>
        <input type={"text"} placeholder={"비밀번호 재입력"}/>
        </ContentStyle>
        <ButtonGroup>
        <button>회원가입 버튼</button>
        <CanButton>취소</CanButton>
        </ButtonGroup>
      </SingUpBoxStyle>
      </ContainerStyle>
      </BodyStyle>
    </Layout>
  );
};
const BodyStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 8em;
  
`
const ContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 340px;
  height: 65vh;
  padding: 1.2rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  background: linear-gradient(#9db8bf, #9ccddb5e);
`;

const ContentStyle = styled.div`
  display: flex;
  flex-direction: column;
  input {
    border: 2px solid white;
    border-radius: 5px;
    margin: 10px 20px;
    height: 35px;
    width: 15em;
  }
`;

const SingUpBoxStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  margin-top: 50px;
`;

const EmailCheckStyle = styled.div`
  display: flex;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 10px;

  button {
  width: 200px;
  height: 20px;
  }
`;

const CanButton = styled.button`
  color: tomato;
  border-color: tomato;
`;

export default Signup;
