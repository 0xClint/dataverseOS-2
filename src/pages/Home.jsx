import React, { useState } from "react";
import { ChatBox, Header } from "../components";
import { bgImg, chatIcon } from "../assets";
import { Link } from "react-router-dom";

const Home = () => {
  const [chatMenu, setChatMenu] = useState(false);
  return (
    <div>
      <img src={bgImg} className="absolute -z-10 h-screen w-screen" />
      <Header />
      <div className="make-flex w-screen h-screen flex-col">
        <div className="w-[600px] mx-auto h-screen flex-col text-center make-flex justify-start pt-32 gap-3">
          <h2 className="font-bold text-[40px] text-white  my-12 make-flex">
            Warfield
          </h2>

          <Link
            to="/game"
            className="btn w-[400px] hover:bg-[#f4f4f4] hover:scale-[101%] py-3 text-lg"
          >
            Duo Game
          </Link>
          <Link
            to="/game"
            className="btn w-[400px] hover:bg-[#f4f4f4] hover:scale-[101%] py-3 text-lg"
          >
            Multiplayer
          </Link>

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
