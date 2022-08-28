import { useState } from "react";
import styled from "styled-components";
import { db } from "../firebase-config";
import { 
    collection,
    addDoc,
    getDocs,
    query,
    where,
    limit,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import PropTypes from "prop-types";

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
    z-index: 3;
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
    const [uploadingData, setUpdloadingData] = useState(false);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        if(uploadingData){return;}
        const data = await getDocs(query(collection(db, `${mapName}-leaderboard`), where("name", "==", playerName), limit(1)));
        if(data.size>0){
            inputRef.current.setCustomValidity("Name already exists");
            inputRef.current.reportValidity();
            setTimeout(()=>inputRef.current.setCustomValidity(""), 3000);
            return;
        }
        if(playerName===""){
            inputRef.current.setCustomValidity("Please enter a name");
            inputRef.current.reportValidity();
            setTimeout(()=>inputRef.current.setCustomValidity(""), 3000);
            return;
        };

        setUpdloadingData(true);
        await addDoc(collection(db, `${mapName}-leaderboard`), {
            name: playerName,
            time: timeStamp[0],
            actualTime: timeStamp[1]
        });
        setUpdloadingData(false);
        navigate("/", {replace: true});
    }

    function optOut(e){
        e.preventDefault();
        navigate("/", {replace: true});
    }

    return(
        <CustomForm onSubmit={handleSubmit}>
            {uploadingData && <div>Uploading...</div>}
            <Congratulations>Congratulations! You Found all the Characters</Congratulations>
            <div style={{display:"flex", flexDirection:"column"}}>
                <label htmlFor="playerName" style={{textAlign:"center", fontSize:"20px"}}>Enter your name:</label>
                <input ref={inputRef} id="playerName" value={playerName} onChange={(e)=>{setPlayerName(e.target.value)}}></input>
                <Button>Submit</Button>
                <Button onClick={optOut}>Opt out leaderboard</Button>
            </div>
        </CustomForm>
    )
}

GameFinishForm.propTypes={
    mapName: PropTypes.string,
    timeStamp: PropTypes.array,
}