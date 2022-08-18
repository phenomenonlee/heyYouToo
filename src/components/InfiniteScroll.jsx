import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import Postlist from "../components/Postlist";
import { __getPost } from "../redux/modules/postSlice";

const CardList = () => {
  const [lastRef, lastCard] = useInView({
    threshold: 0.8,
    triggerOnce: true,
  });
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.post.allPost);

  useEffect(() => {
    dispatch(__getPost(page));
  }, []);

  useEffect(() => {
    dispatch(__getPost(page));
  }, [page]);

  useEffect(() => {
    if (lastCard && page < postList.length) setPage(page + 5);
  }, [lastCard]);
  return (
    <List>
      {postList.map((post, i) => {
        const card =
          postList.length - 1 === i && postList.length > 4 ? (
            <Postlist card={post} key={post.id} ref={lastRef} />
          ) : (
            <Postlist card={post} key={post.id} />
          );
        return card;
      })}
    </List>
  );
};

const List = styled.div`
  flex-flow: column;
`;

export default CardList;
