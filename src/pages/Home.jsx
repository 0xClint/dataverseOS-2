import React from "react";
import { Header } from "../components";
import { bgImg } from "../assets";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <img src={bgImg} className="absolute -z-10 h-screen w-screen" />
      <Header />
      <div className="make-flex w-screen h-screen flex-col">
        <div className="w-[600px] mx-auto h-screen flex-col text-center make-flex justify-start pt-32 gap-3">
          <h2 className="font-bold text-[40px] text-white  my-12 make-flex">
            Game name
          </h2>

          <Link
            to="/game"
            className="btn w-[400px] hover:bg-[#f4f4f4] hover:scale-[101%] py-3 text-lg"
          >
            Start Game
          </Link>

          <Link
            to="/profile"
            className="btn w-[400px] hover:bg-[#f4f4f4] hover:scale-[101%] py-3 text-lg"
          >
            Profile
          </Link>

          <button className="btn w-[400px] hover:bg-[#f4f4f4] hover:scale-[101%] py-3 text-lg">
            Game Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
