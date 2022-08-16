import findPicture from "../assets/egor-klyuchnyk-full-x-season-web.jpg";
import CharacterOption from "./CharacterOption";
import "styled-components";
import styled from "styled-components";
import { useState, useCallback } from "react";
import { useRef } from "react";

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
    font-size: 25px;
    font-weight: bolder;
    padding:20px;
    border:1px solid red;
    border-radius: 50%;
    background-clip: content-box;
    box-shadow: inset 0 0 0 20px rgba(245, 243, 243, 0.3);
    top:0; left:0;
    z-index:20000;
    pointer-events: none;

    & > div{
        margin-top: -3px;
    }
`;

const LocationPointer = styled.div`
    position: absolute;
    display:none;
    justify-content: center;
    align-items: center;
    width:15px; height:15px;
    margin-top:-2px;
    font-size: 50px;
    top:0; left:0;
    font-weight: bolder;
    background-color: red;
    border-radius: 50%;
    color:white;
    
    & > div{
        margin-top: -6.5px;
    }
`;


export default function Image({displayCursor, cursorState}){
    const [cursorPos, setCursorPos] = useState([]);
    const imageRef = useRef(null);
    const locationRef = useRef(null);
    const characterOptionRef = useRef(null);

    function moveCursor (event){
        const x = event.pageX;
        const y = event.pageY;
    
        const scrollLeft = (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
        const scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        const curX =  x - scrollLeft;
        const curY = y - scrollTop;
        
        setCursorPos([curX, curY]);
    }

    function displayOption (event){
        const x = event.pageX;
        const y = event.pageY + 10;

        characterOptionRef.current.style.display="flex";
        locationRef.current.style.display="flex";
        locationRef.current.style.transform=`translate(calc(${cursorPos[0]}px - 50%), calc(${cursorPos[1]}px - 50px))`;

         if(x + 30 >= imageRef.current.clientWidth){
            characterOptionRef.current.style.transform = `translate(calc(${x}px - 150%), calc(${y}px - 50%))`;
        }else if (x - 30 <= 0){
            characterOptionRef.current.style.transform = `translate(calc(${x}px + 40%), calc(${y}px - 50%))`;
        }else{
            characterOptionRef.current.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
        } 
    } 

    function closeOption (){
        locationRef.current.style.display="none";
        characterOptionRef.current.style.display="none";
    }

    let cursorDisplay = displayCursor ? "flex" : "none";
    
    return (
        <CustomMain>
            <FindImage ref={imageRef} onClick={(e) => displayOption(e, this)} onMouseEnter={cursorState} onMouseLeave={cursorState} onMouseMove={moveCursor} src={findPicture} alt="find-character"/>
            <CustomCursor style={{display: cursorDisplay, transform: `translate(calc(${cursorPos[0]}px - 50%), calc(${cursorPos[1]}px - 50%))`}}><div>+</div></CustomCursor>
            <LocationPointer ref={locationRef}><div>+</div></LocationPointer>
            <CharacterOption ref={characterOptionRef} closeOption={closeOption}/>
        </CustomMain>
    )
}