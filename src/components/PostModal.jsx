import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { __getPost } from "../redux/modules/postSlice";
import axios from "axios";
import { getCookie } from "../util/cookie";

const PostModal = () => {
  const postRef = useRef();
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);

  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    // secretKey: "",
  });

  const { title, content } = inputs;

  const background = useRef();
  const titleInput = useRef();
  const contentInput = useRef();
  const secretKeyInput = useRef();

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const onSubmitHandler = async (inputs) => {
    if (inputs === "") return;
    await axios.post("http://wetube-phenomenonlee.shop/api/posts", inputs, {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    });
    dispatch(__getPost());
    setInputs({ title: "", content: "" });
    alert("작성이 완료되었습니다");
  };

  return (
    <SPosthead ref={postRef}>
      나는 어디로가야하온
      <button
        onClick={() => {
          setModal(true);
        }}
      >
        작성버튼
      </button>
      {modal === true ? (
        <>
          <ModalBack
            ref={background}
            onClick={(e) => {
              if (background.current === e.target) {
                setModal(false);
              }
            }}
          >
            <ModalBox>
              <InputOne
                name="title"
                value={title}
                ref={titleInput}
                onChange={onChangeHandler}
                placeholder="제목"
              />
              <InputTwo
                name="content"
                value={content}
                ref={contentInput}
                onChange={onChangeHandler}
                placeholder="내용"
              />
              {/* <InputThree
                name="secretKey"
                value={secretKey}
                ref={secretKeyInput}
                onChange={onChangeHandler}
                placeholder="비밀번호"
              /> */}
              <ModalBtnSet>
                <PostSubmitBtn
                  onClick={() => {
                    onSubmitHandler(inputs);
                    setModal(!modal);
                  }}
                >
                  작성
                </PostSubmitBtn>
              </ModalBtnSet>
            </ModalBox>
          </ModalBack>
        </>
      ) : null}
    </SPosthead>
  );
};

export default PostModal;

const SPosthead = styled.div`
  width: 90%;
  /* margin: 0 auto; */
  margin-top: 20px;
  height: 60px;
  border: 2px solid pink;
  border-radius: 5px;
  padding: 30px;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;

  & button {
    border: 1px solid black;
    border-radius: 15px;
    width: 100px;
    height: 30px;
    background-color: skyblue;

    &:hover {
      background-color: #c3171d;
    }
  }
`;

const ModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const ModalBox = styled.div`
  background-color: #fff;
  position: relative;
  width: 50%;
  height: 45%;
  max-width: 400px;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid black;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  transform: translateY(-50%);
`;

const InputOne = styled.input`
  margin-top: 10px;
  border: 1px solid black;
  width: 300px;
  height: 30px;
  transform: translateY(50%);
`;

const InputTwo = styled.input`
  margin-top: 10px;
  border: 1px solid black;
  width: 300px;
  height: 180px;
  transform: translateY(15%);
`;

// const InputThree = styled.input`
//   margin-top: 10px;
//   border: 1px solid black;
//   width: 300px;
//   height: 30px;
//   transform: translateY(120%);
// `;

const ModalBtnSet = styled.div`
  text-align: space-between;
  margin-top: 20px;
  transform: translateY(120%);
`;

const PostSubmitBtn = styled.button`
  background-color: azure;
`;
