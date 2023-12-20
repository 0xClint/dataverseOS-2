import React, { useMemo, useState } from "react";
import { LeftArrowIcon, RightArrowIcon, bgBlueImg } from "../assets";
import { Canvas } from "@react-three/fiber";
import { PlayerProfile } from "../gameComponents/Playerprofile";
import { OrbitControls } from "@react-three/drei";
import { Header } from "../components";
import WeaponProfile from "../gameComponents/WeaponProfile";

const Profile = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div className="h-screen w-screen ">
      <img src={bgBlueImg} className="absolute -z-10 h-screen w-screen" />
      <Header />
      <div className="absolute top-0 left-0 w-screen h-screen make-flex">
        <div className="make-flex">
          <LeftArrowIcon
            className="h-10 cursor-pointer hover:scale-105"
            onClick={() => {
              if (counter == 0) {
                setCounter(7);
              } else {
                setCounter(counter - 1);
              }
            }}
          />
          <div className=" h-[400px] w-[500px] border">
            <Canvas camera={{ position: [10, 5, 0], fov: 15 }}>
              <ambientLight intensity={0.8} />
              {/* <PlayerProfile /> */}
              <WeaponProfile counter={counter} setCounter={setCounter} />
              <OrbitControls autoRotate={1} />
            </Canvas>
          </div>
          <RightArrowIcon
            className="h-10 cursor-pointer hover:scale-105"
            onClick={() => setCounter(counter + 1)}
          />
        </div>
        <div className="absolute menuSelector top-20 left-2 make-flex flex-col gap-3">
          <div className="h-20 w-20 border rounded-md cursor-pointer hover:scale-105">
            avatar
          </div>
          <div className="h-20 w-20 border rounded-md cursor-pointer hover:scale-105">
            Weapon
          </div>
        </div>
        <h2 className="absolute bottom-32 text-[2rem] w-full text-center text-white">
          Player name
        </h2>
      </div>
    </div>
  );
};

export default Profile;
