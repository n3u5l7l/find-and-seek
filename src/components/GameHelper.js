import { useState } from "react";
import styled from "styled-components";
import { db } from "../firebase-config";
import { 
    collection,
    doc,
    addDoc,
    getDoc,
} from "firebase/firestore";
import { useNavigate, Navigate } from "react-router-dom";

const CustomForm = styled.form`
    position: fixed;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top:0;
    left:0;
    background-color: rgba(143,143,143,0.5);
    width: 100%;
    height: 100%;
`

const Congratulations = styled.div`
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 25px;
    font-weight: bolder;
`
const Button = styled.button`
    border:1px solid;
    background-color: black;
    color:white;
    opacity:0.7;
    cursor: pointer;
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
    font-size: 20px;

    &:hover{
        opacity:1;
        transform:scale(1.01);
    }
`
export default function GameFinishForm({mapName, timeStamp}){
    const [playerName, setPlayerName] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        if(playerName===""){return;};

        await addDoc(collection(db, `${mapName}-leaderboard`), {
            name: playerName,
            time: timeStamp
        });
    }

    function optOut(e){
        e.preventDefault();
        navigate("/", {replace: true});
    }
    return(
        <CustomForm onSubmit={handleSubmit}>
            <Congratulations>Congratulations! You Found all the Characters</Congratulations>
            <div style={{display:"flex", flexDirection:"column"}}>
                <label htmlFor="playerName" style={{textAlign:"center", fontSize:"20px"}}>Enter your name:</label>
                <input id="playerName" value={playerName} onChange={(e)=>{setPlayerName(e.target.value)}}></input>
                <Button>Submit</Button>
                <Button onClick={optOut}>Opt out leaderboard</Button>
            </div>
        </CustomForm>
    )
}