import React, { useState } from "react";
import { Header } from "../components";
import { bgBlueImg } from "../assets";
import { uploadWeb3 } from "../utils/web3storage";

const Profile = () => {
  const [data, setData] = useState("");

  const handleUpload = async (e) => {
    // console.log(e.target.files);
    // bafybeigxniz4riaig73d3756vknbebjuzizwv4hh5kqsnlz4zvlasarwea
    // await uploadWeb3(e.target.files);
  };
  return (
    <div className="h-screen w-screen make-flex">
      <img src={bgBlueImg} className="absolute -z-10 h-screen w-screen" />
      <Header />
      <div className="card-container w-[700px] h-[600px] py-2">
        <h1 className="text-center text-[2.5rem] font-bold mb-10">
          Game Profile
        </h1>
        <div className="px-20 text-lg ">
          <div className="make-flex flex-col gap-2 mb-5">
            <label className="font-semibold w-32">Add Profile</label>
            <input
              type="file"
              className="border border-black w-80"
              onChangeCapture={(e) => handleUpload(e)}
            />
          </div>
          <div className="make-flex justify-start gap-2 mb-5">
            <label className="font-semibold w-16">Name</label>
            <input
              type="text"
              className="border border-black rounded w-[80%] p-1"
            />
          </div>
          <div className="make-flex justify-start gap-2 mb-5">
            <label className="font-semibold w-16">Age</label>
            <input
              type="number"
              className="border border-black rounded w-[80%] p-1"
            />
          </div>
          <div className="make-flex justify-start align-top gap-2 mb-5">
            <label className="font-semibold w-16">Bio</label>
            <textarea className="border border-black rounded w-[80%] h-[200px] p-1" />
          </div>
          <div className="make-flex">
            <button className="btn bg-blue-600 text-white mx-auto hover:scale-105">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
