import Character from "./Character"
import styled from "styled-components"
import { forwardRef } from "react"

const CustomHeader = styled.header`
    position:sticky;
    display:flex;
    align-self: stretch;
    align-items:center;
    flex-direction:column;
    background-color: black;
    color: white;
    top: 0;
    z-index: 2;
    font-size: 20px;
`
const CharacterList = styled.label`
    display:flex;
    justify-content: center;
    align-self: stretch;
    align-items:center;
    opacity: 0.8;
    user-select: none;
    cursor: pointer;
    gap:2px;
    transition: opacity 0.1s ease-in-out;

    &:hover{
        opacity:1;
    }

    &::before{
        content:"⇾"
    }

    &::after{
        content: "⇽"
    }
`

const CustomInput = styled.input`
    position: absolute;
    opacity:0;
    width:0;
    height:0;

    &:checked + section{
        display: flex;
    }
`

export default function Header({children}){

    return (
        <CustomHeader>
            <div className="time">00:00:00</div>
            <CharacterList className="character-dropdown" htmlFor="checklist">Character</CharacterList>
            <CustomInput type="checkbox" id="checklist"></CustomInput>
            {children}
        </CustomHeader>
    )
}
