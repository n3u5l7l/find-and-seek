import "./App.css";
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";
import Leaderboard from "./components/LeaderBoard";
import { useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Maps from "./components/Map";

export default function App() {
  let location = useLocation();

  return (
    <div className="App">
      <Routes location={location} key={location.pathname}>
        <Route index element={<StartScreen />} />
        <Route path="/menu" element={<Maps />} />
        <Route path="/leaderboard/*" element={<Leaderboard />} />
        <Route path="/:mapName" element={<GameScreen />} />
      </Routes>
    </div>
  );
}
