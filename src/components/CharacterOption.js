import styled from "styled-components"

const CharacterList = styled.div`
    position: absolute;
    top:0; left:0;
    color: black;
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
        border:2px scrollbar-width;
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

export default function CharacterOption(){

    return(
        <CharacterList>
            <div className="close"></div>
        </CharacterList>
    )
}