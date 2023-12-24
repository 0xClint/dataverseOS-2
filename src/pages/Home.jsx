import React, { useEffect, useState } from "react";
import { ChatBox, Header, Loader } from "../components";
import { bgImg, chatIcon } from "../assets";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../hooks/useStore";
import {
  createRoomFunc,
  deleteRoomFunc,
  readTableFunc,
  updateRoomFunc,
} from "../utils/functionCall";
import { ethers } from "ethers";
import { nanoid } from "nanoid";

const Home = () => {
  const [chatMenu, setChatMenu] = useState(false);
  const [loader, setLoader] = useState(false);
  const [map, setMap] = useState("Map1");
  const [newUserModel, setNewUserModel] = useState(false);
  const [multiplayerModel, setMultiplayerModel] = useState(false);
  const [isNewUser, setRoomId] = useStore((state) => [
    state.isNewUser,
    state.setRoomId,
  ]);
  const navigate = useNavigate();

  const handleMultiplayer = async (map) => {
    if (isNewUser) setNewUserModel(true);
    else {
      setLoader(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const roomList = await readTableFunc(
        signer,
        process.env.REACT_APP_ROOM_TABLE_NAME
      );
      if (roomList.length > 0) {
        for (let i = 0; i < roomList.length; i++) {
          if (roomList[i].map == map) {
            if (parseInt(roomList[i].people) <= 2) {
              console.log("updateRoom");
              await updateRoomFunc(signer, roomList[i]);
            } else {
              console.log("deleteRoom");
              await deleteRoomFunc(signer, roomList[i].roomid);
            }
            setRoomId(roomList[i].roomid);
            setLoader(false);
            navigate("/game");
            return 0;
          }
        }

        console.log(`CreateRoomwith Map:${map}`);
        const roomId = nanoid().toLocaleUpperCase().slice(0, 5);
        setRoomId(roomId);
        await createRoomFunc(signer, roomId, map);
      } else {
        console.log("CreateRoom");
        const roomId = nanoid().toLocaleUpperCase().slice(0, 5);
        setRoomId(roomId);
        await createRoomFunc(signer, roomId, map);
      }
      navigate("/game");
      setLoader(false);
    }
  };

  return (
    <div>
      <img src={bgImg} className="absolute -z-10 h-screen w-screen" />
      <Header />
      {multiplayerModel && (
        <div className="absolute z-10 w-screen h-screen make-flex bg-[#b0ceff88]">
          <div className="card-container w-[400px]  py-6 flex flex-col">
            <h1 className="text-center text-[1.5rem] font-bold mb-3">
              Select map
            </h1>
            <div className="make-flex justify-around my-3">
              <button
                className="h-[160px] w-[140px]"
                onClick={() => handleMultiplayer("map1")}
              >
                <img
                  src={"#"}
                  className="h-[130px] w-[130px] mx-auto rounded-lg hover:scale-[102%]"
                />
                <p className="text-lg font-bold">Map1</p>
              </button>
              <button
                className="h-[160px] w-[140px]"
                onClick={() => handleMultiplayer("map2")}
              >
                <img
                  src={"#"}
                  className="h-[130px] w-[130px] mx-auto rounded-lg hover:scale-[102%]"
                />
                <p className="text-lg font-bold">Map2</p>
              </button>
            </div>
            <button
              onClick={() => handleMultiplayer("map1")}
              className="btn bg-blue-600 text-white mx-1 hover:scale-105 text-center"
            >
              Random
            </button>
          </div>
        </div>
      )}
      {loader && <Loader />}

      {newUserModel && (
        <div className="absolute z-10 w-screen h-screen make-flex bg-[#b0ceff88]">
          <div className="card-container w-[400px] h-[200px] py-6 flex flex-col">
            <h1 className="text-center text-[2.5rem] font-bold mb-10">
              Create Profile
            </h1>
            <Link
              to="/profile"
              className="btn bg-blue-600 text-white mx-1 hover:scale-105 text-center"
            >
              Profile
            </Link>
          </div>
        </div>
      )}
      <div className="make-flex w-screen h-screen flex-col">
        <div className="w-[600px] mx-auto h-screen flex-col text-center make-flex justify-start pt-32 gap-3">
          <h2 className="font-bold text-[40px] text-white  my-12 make-flex">
            Warfield
          </h2>

          {/* <Link
            to="/game"
            className="btn w-[400px] hover:bg-[#f4f4f4] hover:scale-[101%] py-3 text-lg"
          >
            Duo Game
          </Link> */}
          <button
            onClick={() => setMultiplayerModel(true)}
            className="btn w-[400px] hover:bg-[#f4f4f4] hover:scale-[101%] py-3 text-lg"
          >
            Multiplayer
          </button>

          <Link
            to="/inventory"
            className="btn w-[400px] hover:bg-[#f4f4f4] hover:scale-[101%] py-3 text-lg"
          >
            Inventory
          </Link>

          <button className="btn w-[400px] hover:bg-[#f4f4f4] hover:scale-[101%] py-3 text-lg">
            Game Settings
          </button>
        </div>
      </div>

      <div
        className="absolute menuSelector bottom-5 right-5 cursor-pointer hover:scale-105"
        onClick={() => setChatMenu(!chatMenu)}
      >
        <img src={chatIcon} className="w-20" />
      </div>
      {chatMenu && <ChatBox setChatMenu={setChatMenu} />}
    </div>
  );
};

export default Home;
