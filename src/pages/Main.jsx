import Layout from "../components/Layout";
import styled from "styled-components";
import React from "react";
import Header from "../components/Header";
import Postlist from "../components/Postlist";
import PostModal from "../components/PostModal";

const Main = () => {
  return (
    <Layout>
      <SWrapper>
        <Header />
        <SMain>
          <PostModal />
          <div style={{ width: "100%", overflow: "auto" }}>
            <div style={{ height: "500px" }}>
              <Postlist />
            </div>
          </div>
        </SMain>
      </SWrapper>
    </Layout>
  );
};

const SWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const SMain = styled.div`
  width: 100%;
  height: calc(100% - 120px);
  padding: 10px;
  border: 2px solid green;
  flex-direction: column;
  align-items: center;
  display: flex;
  margin-top: 120px;
  border-top: none;
`;

export default Main;
