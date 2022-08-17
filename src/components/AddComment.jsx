import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { __addComment } from "../redux/modules/commentsSlice";
import styled from "styled-components";

const AddCommentForm = () => {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const [comment, setComment] = useState({
  
    comment: "",
  });

  const onAddCommentButtonHandler = (event) => {
    event.preventDefault();
    if (comment.comment.trim() === "") {
      return alert("댓글을 입력해주세요.");
    }
    dispatch(__addComment({ postId, ...comment }));
    setComment({
      comment: "",
    });
  };

  const onChangeInputHandler = (event) => {
    const { name, value } = event.target;
    setComment({
      ...comment,
      [name]: value,
    });
  };

  return (
    <CommentFormStyle onSubmit={onAddCommentButtonHandler}>
      <CommentInputStyle
        placeholder="댓글을 추가하세요(20자 이내)"
        value={comment.comment}
        name="comment"
        type="text"
        maxLength={20}
        onChange={onChangeInputHandler}
      />
      <button type="submit" onClick={onAddCommentButtonHandler}>
        저장
      </button>
    </CommentFormStyle>
  );
};

const CommentFormStyle = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin: 0px auto;
`;
const CommentInputStyle = styled.input`
  margin: 0px 20px 0px 50px;
  height: 30px;
  width: 400px;
  border: 2px solid lightgray;
  border-radius: 5px;
`;


export default AddCommentForm;
