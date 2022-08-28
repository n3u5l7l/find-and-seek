import { useState, useEffect, useContext, createContext } from "react";
import { db } from "./firebase-config";
import { 
    collection,
    doc,
    Firestore,
    getDoc,
    getDocs,
    serverTimestamp,
    setDoc,
    updateDoc
} from "firebase/firestore";
import "./App.css";
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";
import React from "react";
import findImage from "./assets/egor-klyuchnyk-full-x-season-web.jpg";
import { AnimatePresence } from "framer-motion";
import MenuPage from "./components/Menu";
import Leaderboard from "./components/LeaderBoard";
import { useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Maps from "./components/Map";
new Image().src = `${findImage}`; //pre-load the image before actually showing it, putting it in cache I guess?

export const GameImageContext = createContext();

export default function App() {
    let location = useLocation();

    return (
            <div className="App"> 
                
                    
                        <Routes location={location} key={location.pathname}>
                            <Route index element={<StartScreen />}/>
                            <Route path="/menu" element={<Maps />}/>
                            <Route path="/leaderboard/*" element={<Leaderboard />}/>
                            <Route path="/:mapName" element={<GameScreen/>}/>
                        </Routes>
                    
               
            </div>);
}