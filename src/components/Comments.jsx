import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __getCommentsByPostId } from "../redux/modules/commentsSlice";
import AddCommentForm from "./AddComment";
import Comment from "./Comment";
import styled from "styled-components";
import Layout from "./Layout";
const Comments = () => {
  const { PostId } = useParams();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const data = useSelector((state) => state.comments.commentsByPostId);
    console.log(data)
    
  useEffect(() => {
    if (show) {
      dispatch(__getCommentsByPostId(PostId));
    }
  }, [dispatch, PostId, show]);

  return (
    <>
      <Layout>
        <WrapBox show={show}>
          <ToggleButtonStyle>
            <button
              onClick={() => {
                setShow(!show);
              }}
            >
              {show ? "취소" : "댓글 작성"}
             </button>
          </ToggleButtonStyle>
            {show ? <AddCommentForm /> : null}
        <WrapBox>
          {data?.map((comment) => (
           <Comment key={comment.id} comment={comment} />
             ))}
      </WrapBox>
      </WrapBox>
    </Layout>
      </>
  );
};

const WrapBox = styled.div`
  width: 500px;
  height: ${({ show }) => (show ? "400px" : "50px")};
  margin: 10px auto;
`;


const ToggleButtonStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export default Comments;
