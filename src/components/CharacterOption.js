import styled from "styled-components"
import { forwardRef } from "react";
import { useCallback } from "react";
const CharacterList = styled.div`
    position: fixed;
    top:0; left:0;
    color: black;
    width: max-content;
    z-index:1;
    display:none;
    flex-direction: column;
    background-color: bisque;
    font-weight: bolder;

    & > .close{
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        width:20px;
        font-size: 15px;
        top:0; left:100%;
        background-color: black;
        border-radius: 50%;
        transform: translate(-50%,-50%);
        z-index: 3;
        cursor: pointer;
        opacity:0.8;
        transition: opacity 0.1s ease-in-out;
    }
    & > .close:hover{
        opacity:1;
    }

    & > .character{
        border:2px solid;
        width:100%;
        border-radius: 5px;
        padding:5px;
        justify-content: center;
        cursor: pointer;
        opacity: 0.5;
        transition: opacity 0.1s ease-in-out;
    }

    & > div:hover{
        opacity:1;
    }
`;

const characterArr = ["Ash", "Tom", "Crocodie"];

const CharacterOption = (props, ref) => {


    return(
        <CharacterList ref={ref}>
            <div className="close" onClick={props.closeOption}>❌</div>
            {props.gameCharacter.map((chars, index) => <div className="character" key={index}>{chars.name}</div>)}
        </CharacterList>
    )
}
export default forwardRef(CharacterOption);