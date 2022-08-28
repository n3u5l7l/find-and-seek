import Header from "./Header";
import Game from "./Game";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { MapInfo } from "./Menu";
import Character from "./Character";
import { useEffect, useRef } from "react";

export default function GameScreen() {
  const [displayCursor, setDisplayCursor] = useState(false);
  const [charFound, setCharFound] = useState([]);
  const [gameFinish, setGameFinish] = useState(false);
  const [time, setTime] = useState(["00:00:00", 0]);
  const timeInterval = useRef();
  const params = useParams();

  useEffect(() => {
    const countDownTime = new Date().getTime();

    timeInterval.current = setInterval(function (nodeRef) {
      let now = new Date().getTime();

      let distance = now - countDownTime;

      let hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      hours = String(hours).length === 2 ? hours : "0" + hours;
      minutes = String(minutes).length === 2 ? minutes : "0" + minutes;
      seconds = String(seconds).length === 2 ? seconds : "0" + seconds;

      setTime([`${hours}:${minutes}:${seconds}`, distance]);
    }, 1000);

    return () => {
      clearInterval(timeInterval.current);
    };
  }, []);

  function cursorDisplay(e) {
    setDisplayCursor((prevState) => !prevState);
  }

  const thisMap = MapInfo.find((map) => Object.keys(map)[0] === params.mapName);

  return (
    <>
      <Header time={time}>
        <Character
          characters={thisMap[params.mapName].characters}
          charFound={charFound}
        />
      </Header>
      <Game
        time={time}
        timeInterval={timeInterval}
        gameFinish={gameFinish}
        setGameFinish={setGameFinish}
        charFound={charFound}
        setCharFound={setCharFound}
        mapName={params.mapName}
        gameImage={thisMap[params.mapName].src}
        gameCharacter={thisMap[params.mapName].characters}
        cursorState={cursorDisplay}
        displayCursor={displayCursor}
      />
    </>
  );
}