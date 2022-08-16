import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { __getPost } from "../redux/modules/postSlice";
import { useNavigate } from "react-router-dom";
const Postlist = () => {
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.post.allPost);
  const navigate = useNavigate();
  // console.log(postList);
  useEffect(() => {
    dispatch(__getPost());
  }, []);

  // const KorDate = new Date(postList.createdAt).toLocaleDateString("ko-kr", {
  //   month: "long",
  //   day: "numeric",
  // })
  return (
    <>
      {postList?.map((list) => (
        <div
          key={list.postId}
          onClick={() => {
            navigate(`/detail/${list.postId}`);
          }}
        >
          <SPost>
            <div>{list.nickname}</div>
            <div>{list.title}</div>
            <div>{list.like}</div>
            <div>{list.KorDate}</div>
            {/* <div>{list.content}</div>
            <div>{list.secretKey}</div> */}
          </SPost>
        </div>
      ))}
    </>
  );
};
const SPost = styled.div`
  display: flex;
  margin-top: 25px;
  border: 2px solid skyblue;
  flex-direction: column;
  width: 500px;
  border-radius: 5px;
  padding: 30px;
  margin-left: 35px;
`;

export default Postlist;
