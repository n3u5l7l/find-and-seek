import Header from "./Header";
import Image from "./Image";
import React from "react";
import { useState } from "react";
import CyberPunkSrc from "../assets/egor-klyuchnyk-full-x-season-web.jpg";
import AshKetchum from "../assets/ash-ketch-1.png";
import Tom from "../assets/tom-tom-and-jerry-png-418409.png"

export const images = {
    "CyberPunk": {src: CyberPunkSrc, characters: [{name: "Ash", image: AshKetchum}, {name: "Tom", image: Tom}, {name:"Patrick"}]},
}

export default function GameScreen({gameImage}) {
    const [displayCursor, setDisplayCursor] = useState(false);
    
    function cursorDisplay (e) {
        setDisplayCursor((prevState) => !prevState);
    }

    return (
        <React.Fragment>
            <Header characters={images[gameImage].characters}/>
            <Image gameImage={images[gameImage].src} gameCharacter={images[gameImage].characters} cursorState={cursorDisplay} displayCursor={displayCursor}/>
        </React.Fragment>
    )
}