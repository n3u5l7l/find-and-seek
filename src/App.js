import { useState, useEffect } from "react";
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
import { async } from "@firebase/util";
import "./App.css";
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";
import React from "react";
import findImage from "./assets/egor-klyuchnyk-full-x-season-web.jpg";

new Image().src = `${findImage}`; //pre-load the image before actually showing it, putting it in cache I guess?

export default function App() {
    const [startScreen, setStartScreen] = useState(true);

    let showInPage = startScreen ? (
        <StartScreen setStartScreen={setStartScreen}/>
    ) : (
        <GameScreen/>
    )
    return showInPage;
}
/* export default function App() {
    const userCollectionRef = collection(db, "leaderboard");
    //const userBoard = doc(db, "leaderboard", "player1");
    console.log(userCollectionRef);
    const [player, setPlayer] = useState([]);

    useEffect(() => {
        const getPlayer = async () => {
            try{
            const data = await getDocs(userCollectionRef);
            setPlayer(data.docs.map((doc)=>({...doc.data()}))); //pa: doc.data().name
            }catch(err){
                console.log(err);
            }
        }
        const updateDoc = async () => {
            const ref = doc(db, "leaderboard", "player1");
            await setDoc(ref, {time: serverTimestamp()}, {merge: true});
            const data = await getDocs(userCollectionRef);
            setPlayer(data.docs.map((doc)=>({...doc.data()}))); 
            console.log(data.docs.map((doc)=>({...doc.data()})));
        }

        updateDoc();
    }, []);



    return <div>
        {player.map((names, index)=>
        {
            let time = names.time ? (
                <li key={index}>{names.name} + {names.time.nanoseconds}</li>
            ) : <li key={index}>{names.name} + </li>

            return time;
        }
        )}
        </div>
} */