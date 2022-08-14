import findPicture from "../assets/egor-klyuchnyk-full-x-season-web.jpg";
import "styled-components";
import styled from "styled-components";
import { useState } from "react";

const CustomMain = styled.main`
    position: relative;
    display:flex;
    -webkit-user-drag: none;
    user-select: none;
    overflow: hidden;
`
const FindImage = styled.img`
    max-width: 100%;
    height: auto;
    cursor: none;
    user-select: none;
    -webkit-user-drag: none;
`
const CustomCursor = styled.div`
    position: fixed;
    display: none;
    justify-content: center;
    align-items: center;
    width:50px;
    height:50px;
    color:white;
    font-weight: bolder;
    padding:20px;
    border:1px solid red;
    border-radius: 50%;
    background-clip: content-box;
    box-shadow: inset 0 0 0 20px rgba(245, 243, 243, 0.3);
    top:0; left:0;
    z-index:20000;
    pointer-events: none;
`;

const LocationPointer = styled.div`
    position: absolute;
    display:none;
    justify-content: center;
    align-items: center;
    width:15px; height:15px;
    font-size: 50px;
    top:0; left:0;
    font-weight: bolder;
    background-color: red;
    border-radius: 50%;
    color:white;
`;

const CharacterOption = styled.div`
`
export default function Image({displayCursor, cursorState}){
    const [cursorPos, setCursorPos] = useState([]);

    function moveCursor (event){
        const x = event.pageX;
        const y = event.pageY;
    
        const scrollLeft = (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
        const scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        const curX =  x - scrollLeft;
        const curY = y - scrollTop;
        
        setCursorPos([curX, curY]);
    }
    
    let cursorDisplay = displayCursor ? "flex" : "none";

    return (
        <CustomMain onMouseEnter={cursorState} onMouseLeave={cursorState}>
            <FindImage onMouseMove={moveCursor} className="findPicture" src={findPicture} alt="find-character"/>
            <CustomCursor style={{display: cursorDisplay, transform: `translate(calc(${cursorPos[0]}px - 50%), calc(${cursorPos[1]}px - 50%))`}}>+</CustomCursor>
            <LocationPointer>+</LocationPointer>
        </CustomMain>
    )
}