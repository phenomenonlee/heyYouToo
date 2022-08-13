import React from "react";
import styled from "styled-components"
import AddComment from "./AddComment";




const Comments = () => {
  let [show, setShow] = React.useState(false)

  return (
    <>
    <CommentFormStyle show={show}>
    <div style={{ paddingbBottom: "50px" }}>
      <ButtonStyle onClick={() => {
        setShow((e) => !e);
     }}
     > {show ? "댓글열기" : "댓글닫기" }</ButtonStyle>
      </div>
      <AddComment />
    </CommentFormStyle>
    </>
  );
};

const CommentFormStyle = styled.div`
  
  border: 1px solid black;
  height: ${({ show }) => (show ? "50px" : "400px")};
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  background-color: #ffffff;
  transition: height 700ms ease-in-out;
 


`

const ButtonStyle = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;

    width:15%;
    height: 30px;
    background-color: #ffffff;
    
`



export default Comments;
{/* <button onClick={() => { setShow(true) }}>모달창 열기</button>
{
  show === true ? <>
<CommentFormStyle>
<button onClick={() => { setShow(!show) }}>취소</button>
</CommentFormStyle> </> : null
} */}