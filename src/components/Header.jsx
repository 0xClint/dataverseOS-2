import React, { useState, useEffect } from "react";
import ConnectWallet from "./ConnectWallet";
import { ethers } from "ethers";
import { callFunction } from "../utils/functionCall";
import { Link } from "react-router-dom";
// import Loader from "./Loader";

const Header = () => {
  const [loader, setLoader] = useState(false);

  const callContractFunc = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    await callFunction(signer);
  };

  return (
    <div className="absolute z-10 top-0 w-screen flex flex-col">
      <div className="w-full flex text-[2rem] justify-between items-center h-16 px-5 ">
        <div className="flex gap-4 items-center">
          <div className="leading-7 m-0 p-0 font-bold text-white">
            <Link to="/">Game</Link>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
          <button onClick={() => callContractFunc()}>call</button>
          <ConnectWallet />
        </div>
      </div>
      {/* {loader && <Loader />} */}
    </div>
  );
};

export default Header;