import { useContext, createContext } from "react";
import { CustomButton } from "./StartScreen";
import ApplyParticle from "./ApplyParticle";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import CyberPunkSrc from "../assets/egor-klyuchnyk-full-x-season-web.jpg";
import AshKetchum from "../assets/ash-ketch-1.png";
import Tom from "../assets/tom-tom-and-jerry-png-418409.png";
import Patrick from "../assets/patrick.png";

export const MapInfo = [
  {
    CyberPunk: {
      src: CyberPunkSrc,
      characters: [
        { name: "Ash", image: AshKetchum },
        { name: "Tom", image: Tom },
        { name: "Patrick", image: Patrick },
      ],
      creditTo: "https://www.artstation.com/chekavo"
    },
  },
];

const items = MapInfo.map((map) => {
  const mapName = Object.keys(map)[0];
  return <MapSelect name={mapName} imageSource={map[mapName].src} />;
});

const LocationContext = createContext();

const handleDragStart = (e) => e.preventDefault();

function MapSelect({ name, imageSource }) {
  const location = useContext(LocationContext);

  const button = location.name === "Maps" ? "Select" : "View LeaderBoard";
  const toLocation =
    location.name === "Maps" ? `${name}` : `leaderboard/${name}`;
  return (
    <div
      className="map-option-box"
      onDragStart={handleDragStart}
      role="presentation"
    >
      <h1 style={{ margin: "0", padding: "0", alignSelf: "center" }}>{name}</h1>
      <div
        style={{
          backgroundImage: `url(${imageSource})`,
          backgroundSize: "cover",
          flex: "1",
        }}
      ></div>
      <CustomButton
        to={`/${toLocation}`}
        whileHover={{ scale: 1.05, opacity: 1 }}
        whileTap={{ scale: 0.95, opacity: 1 }}
        style={{ height: "30px" }}
      >
        {button}
      </CustomButton>
    </div>
  );
}

export default function Menu({ name }) {
  let screen = ApplyParticle({ mouseTracking: true, items: items })(
    AliceCarousel
  );
  return (
    <LocationContext.Provider value={{ name }}>
      {screen}
    </LocationContext.Provider>
  );
}