import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Menu from "./Menu";
import ApplyParticle from "./ApplyParticle";
import { Route, Routes, useParams } from "react-router-dom";
import { db } from "../firebase-config";
import { collection, orderBy, getDocs, query } from "firebase/firestore";

const CustomMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  flex: 1;
  padding: 50px;
`;

const CustomHeader = styled.h1`
  margin: 0px;
  padding: 0px;
  color: white;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 10px;
`;
const TableWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  padding: 10px;
  overflow-y: scroll;
  border: 1px solid gray;
  flex: 1;
  border-radius: 15px;
  background-color: black;
`;

function Header() {
  return (
    <>
      <h1>LeaderBoard</h1>
      <Menu name="Leaderboard" />
    </>
  );
}

function PlayerInfo({ name, time }) {
  return (
    <tr>
      <td style={{ textAlign: "center" }}>{name}</td>
      <td style={{ width: "50px" }}></td>
      <td style={{ textAlign: "center" }}>{time}</td>
    </tr>
  );
}

function LeaderboardDisplay({ mapName, players }) {
  let content =
    players.length === 0 ? (
      <CustomMain style={{ justifyContent: "center" }}>
        <h1> Loading...</h1>{" "}
      </CustomMain>
    ) : (
      <CustomMain>
        <CustomHeader>{`${mapName} Leaderboard`}</CustomHeader>
        <TableWrapper>
          <table
            style={{
              tableLayout: "fixed",
              borderCollapse: "collapse",
              width: "100%",
            }}
          >
            <tbody>
              <tr style={{ borderBottom: "1px solid white" }}>
                <th style={{ textAlign: "center", fontSize: "25px" }}>
                  Player
                </th>
                <td></td>
                <th style={{ textAlign: "center", fontSize: "25px" }}>Time</th>
              </tr>
              {players.map((info, index) => (
                <PlayerInfo key={index} name={info.name} time={info.time} />
              ))}
            </tbody>
          </table>
        </TableWrapper>
      </CustomMain>
    );

  return content;
}
function LeaderBoardInfo() {
  const [players, setPlayers] = useState([]);
  const params = useParams();
  const mapName = params.mapName;

  useEffect(() => {
    const userCollectionRef = collection(db, `${mapName}-leaderboard`);

    const getAllPlayers = async () => {
      try {
        const data = await getDocs(
          query(userCollectionRef, orderBy("actualTime"))
        );

        setPlayers(data.docs.map((doc) => ({ ...doc.data() })));
      } catch (err) {
        console.log(err);
      }
    };
    getAllPlayers();
  }, [mapName]);

  const screen = ApplyParticle({ mapName, players })(LeaderboardDisplay);

  return screen;
}
export default function Leaderboard() {
  return (
    <Routes>
      <Route path="/" element={<Header />} />
      <Route path="/:mapName" element={<LeaderBoardInfo />} />
    </Routes>
  );
}
