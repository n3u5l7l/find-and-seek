import React from "react";
import styled from "styled-components";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";
import particlesOptions from "../particles.json";

const StartPage = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap:25px;
    min-height: 100vh;
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

const CustomButton = styled.button`
    border: 1px solid white;
    background-color: black;
    color:white;
    cursor: pointer;
    opacity:0.7;
    transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;

    &:hover{
        opacity: 1;
        transform: scale(1.1);
    }
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
`
export default function StartScreen({setStartScreen}){
    const particlesInit = useCallback( async (engine) => {
        await loadFull(engine);
    }, []);

    return (
        <StartPage>
            <Particle id="tsparticles" options={particlesOptions} init={particlesInit} />
            <h1>Find-And-Seek</h1>
            <Menu>
                <ButtonWrapper className="option-wrapper">
                    <CustomButton onClick={()=> setStartScreen((prevState)=>!prevState)}><h3>Start Game</h3></CustomButton>
                    <CustomButton><h3>View LeaderBoard</h3></CustomButton>
                </ButtonWrapper>
            </Menu>
        </StartPage>
    )
}