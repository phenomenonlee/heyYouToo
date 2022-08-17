import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    clearPost,
  __getPostThunk,
  __updatePostThunk,
  __deletePostThunk} from "../redux/modules/detail";
import styled from "styled-components";
import Comments from "../components/Comments"

const Detail = () => {
  const dispatch = useDispatch();
  const post_data = useSelector((state) => state.posts.allPost)
  // console.log(post_data);
  const { id } = useParams();
  const navigate = useNavigate();

  const [isEdiMode, setIsEditMode] = React.useState(false);
  const [updatedTitle, setUpdatedTitle] = React.useState("");
  const [updatedPost, setUpdatedPost] = React.useState("");
  
  useEffect(() => {
    setUpdatedPost(post_data.title);
    setUpdatedPost(post_data.nicName);

  }, [post_data])


  useEffect(() => {
    dispatch(__getPostThunk(id));
    return () => dispatch(clearPost());
  }, [dispatch, id]);
// 인풋박스에 제목과 내용----------------
  useEffect(() => {
    setUpdatedTitle(post_data.title);
  }, [post_data]);

  useEffect(() => {
    setUpdatedPost(post_data.content);
  }, [post_data]);
// --------------------------------
  const onSaveButtonHandler = () => {
    if (updatedPost.trim() === "" || updatedTitle.trim() === "") {
      return alert("공백이 있습니다.");
    }
    dispatch(
      __updatePostThunk({
        ...post_data,
        title: updatedTitle,
        content: updatedPost,
      })
    );
  
    setIsEditMode(false);
  };

  const onDeleteHandler = () => {
    dispatch(__deletePostThunk(post_data.id));
  };

  return (
    <>
    <Layout>
          {/* <Header />  */}
        <div>
          <h1 onClick={() => {
        navigate("/main")
      }}>🌈</h1>
          <ContentStyled>
            {isEdiMode ? (
              <>
                <EditInputGroupStyle>
                  <div>
                제목수정 : <input 
                  name="title"
                  value={updatedTitle}
                  onChange={(event) => {
                    setUpdatedTitle(event.target.value)
                  }}
                    />
                </div>
                <div>
                내용수정 : <textarea
                name="content"
                maxLength={200}
                value={updatedPost}
                onChange={(event) => {
                  setUpdatedPost(event.target.value);
                      }}                       
                    />
                </div>    
                </EditInputGroupStyle>
                </>
            ) : (
                <>
            <div>
              <NickNDayStyled>
                <h1>{post_data?.nickName}님의 글</h1>
                <div>
                <h1>❤️ {post_data?.like}</h1>
                </div>
              </NickNDayStyled>
              <TitleStyle>{post_data?.title}</TitleStyle>
               <div>
               </div>
              </div>
            <h4>{post_data?.content}</h4>
            <p>{post_data?.createdAt}</p>
              </>
            )}
            
        </ContentStyled>
        </div>
        
        <ButtonGroup>
          {isEdiMode ? (
            <button onClick={onSaveButtonHandler}> 저장 </button>
          ) : (
              <>
          <ButtonStyle onClick={() => {setIsEditMode(true)}}>수정버튼</ButtonStyle>
          <ButtonStyle onClick={() => {navigate("/main") }}>목록버튼</ButtonStyle>
          <ButtonStyle onClick={(event) => {
              event.stopPropagation();
              const result = window.confirm("게시글과 댓글을 삭제할까요?");
              if (result) {
              return onDeleteHandler();
              } else {
              return;}
              }}>삭제버튼</ButtonStyle>
            </>
      )
    }
        </ButtonGroup>
        {/* <CommentForm /> */}
        <Comments />
        {/* <Comment /> */}
      </Layout>
    </>
  );
};

const ContentStyled = styled.div`
  border: 1px solid lightgray;
  width: 100%;
  height: 30em;

  p {
    bottom: 10px;
  }
`
const NickNDayStyled = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 20px;
div{
  display: flex;
  flex-direction: row;
  justify-content: center;
}
`;
const TitleStyle = styled.h1`
  
`;
const ButtonStyle = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;

    width:15%;
    height: 30px;
    background-color: lightgray;
    border-radius: 3px;
`
const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  gap: 10px;
`

const EditInputGroupStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    width: 200px;

    input { 
      width: 200px;
      height: 30px;
    }
    textarea {
      width: 200px;
      height : 300px;
    }
`
export default Detail;
