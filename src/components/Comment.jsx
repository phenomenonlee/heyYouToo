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
// import { nanoid } from "@reduxjs/toolkit";


const Comment = ({ comment }) => {
  const commentList = useSelector((state) => state.comment.data);
  // console.log("sdfsdfsdfComment", commentList);
  
  const dispatch = useDispatch();
  // const commentId = nanoid();
  const { id } = useParams();
  // const [commentId, setCommentId] = useState();

  const [updatedComment, setUpdatedComment] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const onDelButHandler = () => {
    const result = window.confirm("삭제하시겠습니까?");
    if (result) {
      dispatch(__deleteComment(id, comment.id));
    } else {
      return;
    }
    // console.log(comment.id)
  };

  const onUpdatedBtnHandler = () => {
    dispatch(__updateComment(
      comment.id,
      updatedComment,
      )
    );
    setEdit(false);
  };

  // const onUpdatedBtnHandler = () => {
  //   dispatch(__updateComment(
  //     id,
  //     comment.id,
  //     updatedComment,
  //     )
  //   );
  //   setEdit(false);
  // };

  const onChangeEditBtnHandler = (e) => {
    setEdit(true);
    dispatch(__getComment(id));
    setUpdatedComment(e.target.value);
  };

  const onCancelBtnHandler = () => {
    setEdit(false);
  };

  const onEditBtnHandler = () => {
    dispatch(__getComment(comment.id))
    setEdit(true);
  };

  useEffect(() => {
    setUpdatedComment(commentList);
    setIsShow(true);
  }, []);

  useEffect(() => {
    dispatch(__getComment(id));
    setIsShow(false);
  }, []);
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
                <div>
                  {commentList?.map((comment) => {
                    return (
                      <div key={comment.id}>
                        {comment.nickname}
                        {comment.comment}
                        <div>
              <button onClick={onEditBtnHandler}>수정</button>
              <button onClick={onDelButHandler}>삭제</button>
            </div>
                    </div>
                    )})}
              {/* <p>{commentList.nickname}</p>
              <p>{commentList.comment}</p> */}
              {/* <p>{commentList.createdAt}</p> */}
            </div>
           
            </CommentBox>
        </>
      )}
      </div>
      </Layout>
  );
};

const CommentBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  
  
  button {
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
  width: 90px;
  height: 30px;
  }
`;
const ContentStyle = styled.div`
  display: flex;
  flex-direction: row;
`
const CommentInput = styled.input`
  /* margin: 0px 20px 0px 200px;
  height: 30px;
  width: 300px;
  border: 1px solid lightgray;
  border-radius: 5px; */
`;
const Nickname = styled.p`
  /* font-size: 15px;
  position: relative;
  top: -20px; */
`;
const Content = styled.p`
  /* position: relative;
  left: -20px; */
`;

export default Comment;
