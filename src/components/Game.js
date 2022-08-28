import CharacterOption from "./CharacterOption";
import "styled-components";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { db } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import GameFinishForm from "./GameFinishForm";
import PropTypes from "prop-types";

const CustomMain = styled.main`
  position: relative;
  display: flex;
  -webkit-user-drag: none;
  user-select: none;
  overflow: hidden;
`;
const FindImage = styled.img`
  max-width: 100%;
  height: auto;
  cursor: none;
  user-select: none;
  -webkit-user-drag: none;
`;
const CustomCursor = styled.div`
  position: fixed;
  display: none;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  color: white;
  font-size: 25px;
  font-weight: bolder;
  padding: 20px;
  border: 1px solid red;
  border-radius: 50%;
  background-clip: content-box;
  box-shadow: inset 0 0 0 20px rgba(245, 243, 243, 0.3);
  top: 0;
  left: 0;
  transform: translate(10000px, 10000px);
  z-index: 20000;
  pointer-events: none;

  & > div {
    margin-top: -3px;
  }
`;

const LocationPointer = styled.div`
  position: fixed;
  display: none;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  margin-top: -2px;
  font-size: 50px;
  top: 0;
  left: 0;
  font-weight: bolder;
  background-color: red;
  border-radius: 50%;
  color: white;

  & > div {
    margin-top: -6.5px;
  }
`;

const FoundDisplay = styled(motion.div)`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 46px;
  top: 0;
  z-index: 2;
  color: black;
  font-weight: bolder;
  background-color: rgb(80 207 118);
`;
const NotFoundDisplay = styled(motion.div)`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 46px;
  top: 0;
  z-index: 2;
  color: black;
  font-weight: bolder;
  background-color: red;
`;
const Footer = styled.div`
  background-color: black;
  width:100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
function getPagePos(event) {
  const x = event.pageX;
  const y = event.pageY;

  const scrollLeft =
    window.pageXOffset !== undefined
      ? window.pageXOffset
      : (document.documentElement || document.body.parentNode || document.body)
          .scrollLeft;
  const scrollTop =
    window.pageYOffset !== undefined
      ? window.pageYOffset
      : (document.documentElement || document.body.parentNode || document.body)
          .scrollTop;
  const curX = x - scrollLeft;
  const curY = y - scrollTop;

  return [curX, curY];
}

export default function Game({
  displayCursor,
  cursorState,
  gameImage,
  gameCharacter,
  imageCredit,
  mapName,
  charFound,
  setCharFound,
  gameFinish,
  setGameFinish,
  time,
  timeInterval,
}) {
  const [cursorPos, setCursorPos] = useState([]);
  const [foundChar, setFoundChar] = useState(false);
  const [incorrectChoice, setIncorrectChoice] = useState(false);
  const totalFoundChars = useRef(0);
  const locationCoord = useRef(cursorPos);
  const imageRef = useRef(null);
  const locationRef = useRef(null);
  const characterOptionRef = useRef(null);

  function moveCursor(event) {
    const [curX, curY] = getPagePos(event);
    setCursorPos([curX, curY]);
  }

  function displayOption(event) {
    const [x, y] = getPagePos(event);

    //Display the location pointer
    locationRef.current.style.display = "flex";
    locationRef.current.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;

    locationCoord.current = [
      event.nativeEvent.offsetX,
      event.nativeEvent.offsetY,
    ];

    characterOptionRef.current.style.display = "flex";

    //Checks if menu gets hidden if cursor at left and right edges
    if (x + 50 >= imageRef.current.clientWidth) {
      characterOptionRef.current.style.transform = `translate(calc(${x}px - 150%), calc(${y}px + 30%))`;
    } else if (x - 50 <= 0) {
      characterOptionRef.current.style.transform = `translate(calc(${x}px + 50%), calc(${y}px + 30%))`;
    } else {
      characterOptionRef.current.style.transform = `translate(calc(${x}px - 50%), calc(${y}px + 30%))`;
    }
  }

  function closeOption() {
    locationRef.current.style.display = "none";
    characterOptionRef.current.style.display = "none";
  }

  async function checkCoordinate(character) {
    const charDoc = doc(db, `${mapName}-characters`, character);
    const data = await getDoc(charDoc);
    closeOption();

    const x = (locationCoord.current[0] / imageRef.current.clientWidth) * 100;
    const y = (locationCoord.current[1] / imageRef.current.clientHeight) * 100;
    if (
      x >= data.data()["x-min"] &&
      x <= data.data()["x-max"] &&
      y >= data.data()["y-min"] &&
      y <= data.data()["y-max"]
    ) {
      totalFoundChars.current++;
      if (totalFoundChars.current === gameCharacter.length) {
        clearInterval(timeInterval.current);
        setGameFinish(true);
      }
      setFoundChar(true);
      setTimeout(() => {
        setFoundChar(false);
      }, 1000);
      setCharFound((prev) => [...prev, character]);
    } else {
      setIncorrectChoice(true);
      setTimeout(() => {
        setIncorrectChoice(false);
      }, 1000);
    }
  }

  useEffect(() => {
    document.addEventListener("scroll", closeOption);

    return () => {
      document.removeEventListener("scroll", closeOption);
    };
  }, []);

  let cursorDisplay = displayCursor ? "flex" : "none";

  return (
    <>
      <CustomMain>
        <AnimatePresence>
          {foundChar && (
            <FoundDisplay
              key="foundChar"
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              exit={{ y: -100 }}
            >
              Found {charFound[charFound.length - 1]}
            </FoundDisplay>
          )}
          {incorrectChoice && (
            <NotFoundDisplay
              key="notFoundChar"
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              exit={{ y: -100 }}
            >
              Incorrect
            </NotFoundDisplay>
          )}
          {gameFinish && <GameFinishForm timeStamp={time} mapName={mapName} />}
        </AnimatePresence>
        <FindImage
          ref={imageRef}
          onClick={(e) => displayOption(e, this)}
          onMouseEnter={cursorState}
          onMouseLeave={cursorState}
          onMouseMove={moveCursor}
          src={gameImage}
          alt="find-character"
        />
        <CustomCursor
          style={{
            display: cursorDisplay,
            transform: `translate(calc(${cursorPos[0]}px - 50%), calc(${cursorPos[1]}px - 50%))`,
          }}
        >
          <div>+</div>
        </CustomCursor>
        <LocationPointer ref={locationRef}>
          <div>+</div>
        </LocationPointer>
        <CharacterOption
          checkCoordinate={checkCoordinate}
          gameCharacter={gameCharacter}
          ref={characterOptionRef}
          closeOption={closeOption}
        />
      </CustomMain>
      <Footer><a style={{textDecoration:"none", color:"white"}} href={`${imageCredit}`} target="_blank" rel="noreferrer">Image provided by</a></Footer>
    </>
  );
}

Game.propTypes = {
  displayCursor: PropTypes.bool,
  cursorState: PropTypes.func,
  gameImage: PropTypes.string,
  gameCharacter: PropTypes.array,
  imageCredit: PropTypes.string,
  mapName: PropTypes.string,
  charFound: PropTypes.bool,
  setCharFound: PropTypes.func,
  gameFinish: PropTypes.bool,
  setGameFinish: PropTypes.func,
  time: PropTypes.string,
  timeInterval: PropTypes.number,
};
