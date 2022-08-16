import Header from "./Header";
import Image from "./Image";
import React from "react";
import { useState } from "react";

export default function GameScreen() {
    const [displayCursor, setDisplayCursor] = useState(false);

    function cursorDisplay (e) {
        setDisplayCursor((prevState) => !prevState);
    }

    return (
        <React.Fragment>
            <Header />
            <Image cursorState={cursorDisplay} displayCursor={displayCursor}/>
        </React.Fragment>
    )
}