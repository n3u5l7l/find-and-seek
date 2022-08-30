import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import ApplyParticle from "./ApplyParticle";
import { Link } from "react-router-dom";

const Menu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;
const MotionLink = motion(Link);

export const CustomButton = styled(MotionLink)`
  border: 1px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: white;
  cursor: pointer;
  text-decoration: none;
  opacity: 0.7;
  padding-left:5px; padding-right:5px;
`;

function HomeMenu() {
  return (
    <React.Fragment>
      <h1>Find-And-Seek</h1>
      <Menu>
        <ButtonWrapper className="option-wrapper">
          <CustomButton
            to="/menu"
            whileHover={{ scale: 1.05, opacity: 1 }}
            whileTap={{ scale: 0.95, opacity: 1 }}
          >
            <h3>Start Game</h3>
          </CustomButton>
          <CustomButton
            to="/leaderboard"
            whileHover={{ scale: 1.05, opacity: 1 }}
            whileTap={{ scale: 0.95, opacity: 1 }}
          >
            <h3>View LeaderBoard</h3>
          </CustomButton>
        </ButtonWrapper>
      </Menu>
    </React.Fragment>
  );
}

export default function StartScreen() {
  let screen = ApplyParticle()(HomeMenu);
  return screen;
}