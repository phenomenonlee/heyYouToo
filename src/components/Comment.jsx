import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  __deleteComment,
  __updateComment,
} from "../redux/modules/commentsSlice";
import { __getComment } from "../redux/modules/commentSlice";
import Layout from "./Layout";


const Comment = ({ comment }) => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [updatedComment, setUpdatedComment] = useState("");
  const [isShow, setIsShow] = useState(false);

  const { commentList } = useSelector((state) => state);
  console.log(commentList);

  const onDelButHandler = () => {
    const result = window.confirm("삭제하시겠습니까?");
    if (result) {
      dispatch(__deleteComment(comment.id));
    } else {
      return;
    }
  };

  const onUpdatedBtnHandler = () => {
    dispatch(
      __updateComment({
        id: comment.id,
        content: updatedComment,
        nickName: "",
        postId,
      })
    );
    setEdit(false);
  };

  const onChangeEditBtnHandler = (e) => {
    setEdit(true);
    dispatch(__getComment(comment.id));
    setUpdatedComment(e.target.value);
  };

  const onCancelBtnHandler = () => {
    setEdit(false);
  };

  const onEditBtnHandler = () => {
    setEdit(true);
  };

  useEffect(() => {
    setUpdatedComment(commentList);
    setIsShow(true);
  }, [commentList, isShow]);

  useEffect(() => {
    dispatch(__getComment());
    setIsShow(false);
  }, [edit, isShow]);

  return (
    <Layout>
    <div>
      {edit ? (
        <>
          <div>
            <CommentInput
              type="text"
              onChange={onChangeEditBtnHandler}
              maxLength={30}
              placeholder="수정할 내용을 입력해주세요(20자 이내)"
            />
          </div>
          <div>
            <button onClick={onCancelBtnHandler}> 취소</button>
            <button onClick={onUpdatedBtnHandler}> 저장</button>
          </div>
        </>
      ) : (
        <>
              <CommentBox>
            <p>{comment.nickName}</p>
            <p>{comment.comment}</p>
            <div>
              <button onClick={onEditBtnHandler}>수정</button>
              <button onClick={onDelButHandler}>삭제</button>
            </div>
          </CommentBox>
        </>
      )}
      </div>
      </Layout>
  );
};

const CommentBox = styled.div`
  max-width: 700px;
  width: 100vw;
  height: 40px;
  margin: 10px auto;
  border: 1px solid lightgray;
  border-radius: 10px;
  display: flex;
  padding: 20px;
  
  button {
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
  width: 150px;
  height: 70px;
  
  }
`;

const CommentInput = styled.input`
  margin: 0px 20px 0px 200px;
  height: 30px;
  width: 300px;
  border: 1px solid lightgray;
  border-radius: 5px;
`;
const Nickname = styled.p`
  font-size: 15px;
  position: relative;
  top: -20px;
`;
const Content = styled.p`
  position: relative;
  left: -20px;
`;

export default Comment;
