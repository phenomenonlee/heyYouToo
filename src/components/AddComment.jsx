import React from "react";
import styled from "styled-components"


const AddComment = () => {
    return (
        <form onSubmit={null}>
            <GroupStyle>
                <Input type={"text"} placeholder={"내용입력"}/>
                <ButtonStyle type="submit" onClick={null}>
                입력
                </ButtonStyle>
            </GroupStyle>
        </form>
    )
}

const Input = styled.input`
border: 2px solid lightgray;
height: 30px;
width: 82% ;
`
const ButtonStyle = styled.button`
    width:15%;
    height: 30px;
    background-color: lightgray;
    
`
const GroupStyle = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px 20px;

`

export default AddComment;