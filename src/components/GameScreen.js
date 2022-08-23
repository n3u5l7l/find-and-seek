import Header from "./Header";
import Game from "./Game";
import React from "react";
import { useState } from "react";
import CyberPunkSrc from "../assets/egor-klyuchnyk-full-x-season-web.jpg";
import AshKetchum from "../assets/ash-ketch-1.png";
import Tom from "../assets/tom-tom-and-jerry-png-418409.png"
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { MapInfo } from "./Menu";
import Character from "./Character";
import { useEffect } from "react";


export default function GameScreen() {
    const [displayCursor, setDisplayCursor] = useState(false);
    const [charFound, setCharFound] = useState([]);
    const [gameFinish, setGameFinish] = useState(false);

    const params = useParams();

    function cursorDisplay (e) {
        setDisplayCursor((prevState) => !prevState);
    }

    const thisMap = MapInfo.find((map)=>Object.keys(map)[0] === params.mapName);

    return (
    <>
        <Header>
            <Character characters={thisMap[params.mapName].characters} charFound={charFound} />
        </Header>
        <Game gameFinish={gameFinish} setGameFinish={setGameFinish} charFound={charFound} setCharFound={setCharFound} mapName={params.mapName} gameImage={thisMap[params.mapName].src} gameCharacter={thisMap[params.mapName].characters} cursorState={cursorDisplay} displayCursor={displayCursor}/>
    </> 
    );
}