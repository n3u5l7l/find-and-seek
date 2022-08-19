import { GameImageContext } from "../App";
import { useContext } from "react";
import { images } from "./GameScreen";
import { CustomButton } from "./StartScreen";
import AliceCarousel from "react-alice-carousel";
import 'react-alice-carousel/lib/alice-carousel.css';


const handleDragStart = (e) => e.preventDefault();

function MapSelect({name, imageSource}){
    const game = useContext(GameImageContext);
    return(
        <div className="map-option-box" onDragStart={handleDragStart} role="presentation">
            <h1 style={{margin:"0", padding:"0", alignSelf:"center"}}>{name}</h1>
            <div style={{backgroundImage: `url(${imageSource})`, backgroundSize:"cover", flex:"1"}}></div>
            <CustomButton onClick={() => {game.setGameImage(name); game.setStartScreen((prev)=>!prev)}} whileHover={{scale:1.05, opacity:1}} whileTap={{scale:0.95, opacity:1}} style={{height:"30px"}}>Select</CustomButton>
        </div>
    )
}

const items = [
    <MapSelect name="CyberPunk" imageSource={images["CyberPunk"].src}/>,
    <MapSelect name="Nintendo" imageSource=""/>
];


export default function MapMenu ({setGameImage}){
  return (
    <AliceCarousel mouseTracking items={items}/>
  );
}