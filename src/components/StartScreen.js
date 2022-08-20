import React, { useContext } from "react";
import styled from "styled-components";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback, useState } from "react";
import particlesOptions from "../particles.json";
import { motion } from "framer-motion";
import { GameImageContext } from "../App";
import Leaderboard from "./LeaderBoard";
import ApplyParticle from "./ApplyParticle";
import { Link } from "react-router-dom";
const StartPage = styled(motion.main)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap:25px;
    min-width: 100vw;
    min-height: 100vh;
    width:100%;
    margin:0; padding:0;
    color:white;
`;

const Particle = styled(Particles)`
    position: fixed;
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    left: 0;
    top: 0;
    z-index: -1;
`;

const Menu = styled.nav`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ButtonWrapper = styled.div`
    display: flex;
    gap:10px;
    flex-direction: column;
`;
const MotionLink = motion(Link);

export const CustomButton = styled(MotionLink)`
    border: 1px solid white;
    display:flex;
    justify-content: center;
    align-items:center;
    background-color: black;
    color:white;
    cursor: pointer;
    text-decoration: none;
    opacity:0.7;
`;

function HomeMenu ({setStartScreen, setOptionScreen, setLeaderboardScreen}){

    return (
        <React.Fragment>
            <h1>Find-And-Seek</h1>
            <Menu>
                <ButtonWrapper className="option-wrapper">
                    <CustomButton to="/menu" whileHover={{scale:1.05, opacity:1}} whileTap={{scale:0.95, opacity:1}}><h3>Start Game</h3></CustomButton>
                    <CustomButton to="/leaderboard" whileHover={{scale:1.05, opacity:1}} whileTap={{scale:0.95, opacity:1}}><h3>View LeaderBoard</h3></CustomButton>
                </ButtonWrapper>
            </Menu>
        </React.Fragment>
    )
}


export default function StartScreen({setStartScreen, setGameImage, setOptionScreen, setLeaderboardScreen}){
    let screen = ApplyParticle({setStartScreen,  setOptionScreen, setLeaderboardScreen})(HomeMenu);
    return (
        screen
    )
}



/*
    //const [optionScreen, setOptionScreen] = useState(false);
    //const [leaderboardScreen, setLeaderboardScreen] = useState(false);
   //onClick={()=> {setOptionScreen((prevState)=>!prevState); setStartScreen((prev)=>!prev)}
   //onClick={() => {setLeaderboardScreen((prev)=>!prev)(}}
  const particlesInit = useCallback( async (engine) => {
        await loadFull(engine);
    }, []); 

    //let content = (optionScreen && <MapMenu setGameImage={setGameImage} />) || (leaderboardScreen && <Leaderboard />) || <HomeMenu setStartScreen={setStartScreen} setLeaderboardScreen={setLeaderboardScreen} setOptionScreen={setOptionScreen}/>;
    //let screen = ApplyParticle(HomeMenu, {setStartScreen, setOptionScreen, setLeaderboardScreen});
         <StartPage  exit={{opacity:0}} transition={{duration:0.5}}  >
            <Particle id="tsparticles" options={particlesOptions} init={particlesInit} />
            {content}
        </StartPage> 
*/