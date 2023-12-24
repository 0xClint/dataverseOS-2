import React, { useEffect, useState } from "react";
import { Header, Loader } from "../components";
import { bgBlueImg } from "../assets";
import { uploadWeb3 } from "../utils/web3storage";
import {
  createBareFile,
  createFolder,
  getFolderData,
} from "../utils/dataverseFuncCall";
import { createUserFunc } from "../utils/functionCall";
import { ethers } from "ethers";
import { Link } from "react-router-dom";
import { useStore } from "../hooks/useStore";
import { colorData } from ".";

const Profile = () => {
  const [isNewUser, userData] = useStore((state) => [
    state.isNewUser,
    state.userData,
  ]);
  const [colorh, setColorh] = useState("#F99417");
  const [loader, setLoader] = useState(false);
  const [success, setSuccess] = useState(false);
  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [age, setAge] = useState("");
  const [cid, setCid] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      if (!isNewUser) {
        setName(userData.name);
        setAge(userData.age);
        setBio(userData.bio);
        setCid(userData.cid);
      }
    };
    checkUser();
  }, [isNewUser, userData]);

  const handleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    const cid = await uploadWeb3(file);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    await createUserFunc(signer, {
      name,
      bio,
      cid,
      color: colorh,
    });

    const folderId = await createFolder();
    await createBareFile({
      folderId,
      name,
      bio,
      age,
      cid,
      age,
      color: colorh,
    });
    setLoader(false);
    setSuccess(true);
  };
  return (
    <div className="h-screen w-screen make-flex">
      <img src={bgBlueImg} className="absolute -z-10 h-screen w-screen" />
      <Header />
      {loader && <Loader />}
      {success && (
        <div className="absolute z-10 w-screen h-screen make-flex bg-[#b0ceff88]">
          <div className="card-container w-[400px] h-[200px] py-6 flex flex-col">
            <h1 className="text-center text-[2.5rem] font-bold mb-10">
              Go Home
            </h1>
            <a
              href="/"
              onClick={() => setSuccess(false)}
              className="btn bg-blue-600 text-white mx-1 hover:scale-105 text-center"
            >
              Home
            </a>
          </div>
        </div>
      )}
      <div className="card-container w-[700px] py-6">
        <h1 className="text-center text-[2.5rem] font-bold">Game Profile</h1>
        {!isNewUser && (
          <div className="h-[100px] w-[100px] mx-auto mb-3">
            <img
              src={`https://ipfs.io/ipfs/${cid}/${"Clint_bg_violet"}.png`}
              className="h-full rounded-lg "
            />
          </div>
        )}
        <form className="px-20 text-lg " onSubmit={(e) => handleSubmit(e)}>
          <div className="make-flex flex-col mb-5">
            <label className="font-semibold w-32">Add Profile</label>
            <input
              type="file"
              className="border border-black w-72"
              onChange={(e) => setFile(e.target.files)}
              required
            />
          </div>
          <div className="make-flex justify-start gap-2 mb-5">
            <label className="font-semibold w-16">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-black rounded w-[80%] p-1"
              required
            />
          </div>
          <div className="make-flex justify-start gap-2 mb-5">
            <label className="font-semibold w-16">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="border border-black rounded w-[80%] p-1"
              required
            />
          </div>
          <div className="color-container w-[100%] make-flex flex-wrap gap-2 mb-2">
            {colorData.map(({ lock, color, id }) => {
              return (
                <div
                  key={id}
                  className="w-10 h-10 border-2 cursor-pointer hover:scale-105"
                  onClick={() => setColorh(color)}
                  style={{
                    background: color,
                    // filter: lock ? "brightness(60%)" : "brightness(100%)",
                    transform: color == colorh ? "scale(1.05)" : "scale(1)",
                    border: color == colorh ? "3px solid white" : "none",
                  }}
                ></div>
              );
            })}
          </div>
          <div className="make-flex justify-start align-top gap-2 mb-5">
            <label className="font-semibold w-16">Bio</label>
            <textarea
              className="border border-black rounded w-[80%] h-[100px] p-1"
              required
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <div className="make-flex">
            <button
              // onClick={() => handleSubmit()}
              className="btn bg-blue-600 text-white mx-auto hover:scale-105"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
