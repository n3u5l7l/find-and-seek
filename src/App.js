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
import Header from "./components/Header";
import Image from "./components/Image";
import "./App.css";
export default function App() {
    let [displayCursor, setDisplayCursor] = useState(false);

    function cursorDisplay (e) {
        setDisplayCursor((prevState) => !prevState);
    }
    return (<div>
        <Header />
        <Image cursorState={cursorDisplay} displayCursor={displayCursor}/>
    </div>)
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