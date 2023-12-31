import { usePlayersList } from "playroomkit";
import { useEffect, useState } from "react";
import { useStore } from "../hooks/useStore";
import { Link, useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { readTableFunc, updateLeaderboardFunc } from "../utils/functionCall";
import { Loader } from "../components";

export const Leaderboard = () => {
  const players = usePlayersList(true);
  const [winner, setWinner] = useState(false);
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState(false);
  const [killstate, roomState] = useStore((state) => [
    state.killstate,
    state.roomState,
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const chechDead = async () => {
      let myPlayerData = players.filter((item) => item.myId == item.id);
      if (myPlayerData[0]?.state?.dead) {
        setWinner(false);
        setModal(true);
        return 0;
      }
      if (players.length > 1) {
        let deadCount = 0;
        for (let item of players) {
          if (item?.state?.dead) deadCount++;
        }
        if (deadCount == players.length - 1) {
          setWinner(true);
          setModal(true);
        }
      }
    };
    chechDead();
  }, [players]);

  const handleSaveWin = async () => {
    setLoader(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    console.log(process.env.REACT_APP_LEADERBOARD_TABLE_NAME);
    const rankList = await readTableFunc(
      signer,
      process.env.REACT_APP_LEADERBOARD_TABLE_NAME
    );
    let lastRankTime = rankList[0];
    let lastRankId = rankList[0].id;
    for (let i = 0; i < rankList.length; i++) {
      if (lastRankTime < rankList[i]) {
        lastRankTime = rankList[i];
        lastRankId = rankList[i].id;
      }
      if (rankList[i].addr == "0") {
        console.log("rankList[i]: " + rankList[i].id);
        await updateLeaderboardFunc(
          signer,
          rankList[i].id,
          killstate,
          roomState
        );
        return 0;
      }
    }
    console.log("lastRank Id : " + lastRankId);
    await updateLeaderboardFunc(signer, lastRankId, killstate, roomState);
    setLoader(false);
    navigate("/");
  };

  if (modal) {
    return (
      <div className="absolute z-10 w-screen h-screen make-flex bg-[#b0ceff88]">
        {loader && <Loader />}
        <div className="card-container w-[500px] py-6 flex flex-col">
          <h1 className="text-center text-[2.5rem] font-bold mb-10">
            {winner ? "You are the Winner" : "You were killed"}
          </h1>
          <div className="flex flex-col gap-3 mb-5">
            {players.map((player) => (
              <div key={player.id} className="flex justify-between px-7">
                <div className="flex gap-3">
                  <img
                    src={player.state.profile?.photo || ""}
                    className="w-10 h-10 border-2 rounded-full"
                    style={{
                      borderColor: player.state.profile?.color,
                    }}
                  />
                  <h2 className={`font-bold text-sm make-flex text-[1.1rem]`}>
                    {player.state.profile?.name}
                  </h2>
                </div>
                <div className="flex text-sm items-center gap-16 text-[1.3rem]">
                  <p>🔫 {player.state.kills}</p>
                  <p>💀 {player.state.deaths}</p>
                </div>
              </div>
            ))}
          </div>
          {winner ? (
            <button
              onClick={() => handleSaveWin()}
              className="btn bg-blue-600 text-white mx-1 hover:scale-105 text-center"
            >
              Save
            </button>
          ) : (
            <Link
              to="/"
              className="btn bg-blue-600 text-white mx-1 hover:scale-105 text-center"
            >
              Go Home
            </Link>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="fixed top-0 left-0 right-0 p-4 flex z-10 gap-4">
          {players.map((player) => (
            <div
              key={player.id}
              className={`bg-white  bg-opacity-60 backdrop-blur-sm flex items-center rounded-lg gap-2 p-2 min-w-[140px]`}
            >
              <img
                src={player.state.profile?.photo || ""}
                className="w-10 h-10 border-2 rounded-full"
                style={{
                  borderColor: player.state.profile?.color,
                }}
              />
              <div className="flex-grow">
                <h2 className={`font-bold text-sm`}>
                  {player.state.profile?.name}
                </h2>
                <div className="flex text-sm items-center gap-4">
                  <p>🔫 {player.state.kills}</p>
                  <p>💀 {player.state.deaths}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="fixed top-4 right-4 z-10 text-white"
          onClick={() => {
            // toggle fullscreen
            if (document.fullscreenElement) {
              document.exitFullscreen();
            } else {
              document.documentElement.requestFullscreen();
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
            />
          </svg>
        </button>
      </>
    );
  }
};
