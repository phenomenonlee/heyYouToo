import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { __getPost } from "../redux/modules/postSlice";
import { useNavigate } from "react-router-dom";
import { forwardRef } from "react";
import { useInView } from "react-intersection-observer";

const Postlist = forwardRef((props, ref) => {
  // const [lastRef, lastCard] = useInView({
  //   threshold: 0.8,
  //   triggerOnce: true,
  // });
  // const [page, setPage] = useState(0);
  // useEffect(() => {
  //   dispatch(__getPost(page));
  // }, []);

  // useEffect(() => {
  //   if (lastCard && page < postList.length) setPage(page + 5);
  // }, [lastCard]);

  const dispatch = useDispatch();
  const postList = useSelector((state) => state.post.allPost);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(__getPost());
  }, []);

  return (
    <>
      {postList?.map((list, i) => (
        <SList
          key={list.postId}
          onClick={() => {
            navigate(`/detail/${list.postId}`);
          }}
          ref={ref}
        >
          <SPost>
            <SNickname>{list.nickname}</SNickname>
            <STitle>{list.title}</STitle>
            <ImgCover>
              <SLove></SLove>
              <SLoveNumber>{list.like}</SLoveNumber>
            </ImgCover>
            <SDate>{list.createdAt.slice(0, 19)}</SDate>
          </SPost>
        </SList>
      ))}
    </>
  );
});

const SList = styled.div`
  background-color: #fff;
`;
const SPost = styled.div`
  display: flex;
  margin-top: 25px;
  border: 2px solid skyblue;
  flex-direction: column;
  width: 500px;
  border-radius: 5px;
  padding: 30px;
  margin-left: 35px;
  cursor: pointer;
  background-color: #fff;
`;

const SNickname = styled.div`
  background-color: #fff;
  font-size: 15px;
  font-weight: bold;
`;

const STitle = styled.div`
  background-color: #fff;
  font-size: 15px;
`;

const ImgCover = styled.div`
  flex-direction: row;
  display: flex;
  background-color: #fff;
`;

const SLove = styled.img`
  background-image: url("/assets/images/love.png");
  background-size: cover;
  width: 20px;
  height: 20px;
  background-color: #fff;
`;

const SLoveNumber = styled.div`
  margin-left: 10px;
  background-color: #fff;
`;

const SDate = styled.div`
  background-color: #fff;
  color: violet;
  font-style: italic;
`;

export default Postlist;
