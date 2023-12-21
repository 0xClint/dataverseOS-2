import React, { useMemo, useState } from "react";
import {
  LeftArrowIcon,
  RightArrowIcon,
  avatarIcon,
  bgBlueImg,
  gunIcon,
} from "../assets";
import { Canvas } from "@react-three/fiber";
import { PlayerProfile } from "../gameComponents/Playerprofile";
import { OrbitControls } from "@react-three/drei";
import { Header } from "../components";
import { weaponsData } from "../assets";

const colorData = [
  {
    lock: false,
    color: "#4CB9E7",
  },
  {
    lock: false,
    color: "#EF4040",
  },
  {
    lock: false,
    color: "#C69774",
  },
  {
    lock: false,
    color: "#176B87",
  },
  {
    lock: false,
    color: "#9ADE7B",
  },
  {
    lock: true,
    color: "#FFC436",
  },
  {
    lock: true,
    color: "#F875AA",
  },
  {
    lock: true,
    color: "#232D3F",
  },
  {
    lock: true,
    color: "#7752FE",
  },
  {
    lock: true,
    color: "#F99417",
  },
  {
    lock: true,
    color: "#F8FF95",
  },
  {
    lock: true,
    color: "#512B81",
  },
];

const Inventory = () => {
  const [gunId, setGunId] = useState(1);
  const [color, setColor] = useState("#F99417");

  const [avatarMenu, setAvatarMenu] = useState(true);

  return (
    <div className="h-screen w-screen ">
      <img src={bgBlueImg} className="absolute -z-10 h-screen w-screen" />
      <Header />
      {avatarMenu ? (
        <div className="absolute top-0 left-0 w-screen h-screen make-flex">
          <div className="make-flex">
            <LeftArrowIcon className="h-10 cursor-pointer hover:scale-105" />
            <div className=" h-[600px] w-[400px]">
              <Canvas camera={{ position: [10, -10, 0], fov: 20 }}>
                <ambientLight intensity={0.8} />
                <PlayerProfile color={color} />
                <OrbitControls autoRotate={1} />
              </Canvas>
            </div>
            <RightArrowIcon className="h-10 cursor-pointer hover:scale-105" />
          </div>
          <div className="absolute menuSelector top-1/3 right-24 make-flex flex-col gap-4 text-white">
            <div className="text-xl">Change Color</div>
            <div className="color-container w-52 make-flex flex-wrap gap-2">
              {colorData.map(({ lock, color }) => {
                return (
                  <div
                    key={color}
                    className="w-10 h-10 border-2 cursor-pointer hover:scale-105"
                    onClick={() => setColor(color)}
                    style={{
                      background: color,
                      filter: lock ? "brightness(60%)" : "brightness(100%)",
                    }}
                  ></div>
                );
              })}
            </div>
          </div>
          <div className="absolute menuSelector top-20 left-2 make-flex flex-col gap-4 text-white">
            <div
              className="h-24 w-24  rounded-md cursor-pointer hover:scale-105 make-flex flex-col"
              onClick={() => setAvatarMenu(true)}
            >
              <img src={avatarIcon} className="h-[65%]" />
              Avatar
            </div>
            <div
              className="h-24 w-24  rounded-md cursor-pointer hover:scale-105 make-flex flex-col"
              onClick={() => setAvatarMenu(false)}
            >
              <img src={gunIcon} className="h-[65%]" />
              Weapons
            </div>
          </div>
          <h2 className="absolute bottom-40 text-[2rem] w-full text-center text-white">
            Player name
          </h2>
        </div>
      ) : (
        <div className="absolute top-0 left-0 w-screen h-screen make-flex">
          <div className="make-flex">
            <LeftArrowIcon
              className="h-10 cursor-pointer hover:scale-105"
              onClick={() => {
                if (gunId == 1) setGunId(weaponsData.length);
                else setGunId(gunId - 1);
              }}
            />
            <div className=" h-[300px] w-[500px] make-flex">
              <img src={weaponsData[gunId - 1].src} className="h-[90%]" />
            </div>
            <RightArrowIcon
              className="h-10 cursor-pointer hover:scale-105"
              onClick={() => {
                if (gunId == weaponsData.length) setGunId(1);
                else setGunId(gunId + 1);
              }}
            />
          </div>

          <div className="absolute menuSelector top-20 left-2 make-flex flex-col gap-4 text-white">
            <div
              className="h-24 w-24  rounded-md cursor-pointer hover:scale-105 make-flex flex-col"
              onClick={() => setAvatarMenu(true)}
            >
              <img src={avatarIcon} className="h-[65%]" />
              Avatar
            </div>
            <div
              className="h-24 w-24  rounded-md cursor-pointer hover:scale-105 make-flex flex-col"
              onClick={() => setAvatarMenu(false)}
            >
              <img src={gunIcon} className="h-[65%]" />
              Weapons
            </div>
          </div>
          <h2 className="absolute bottom-40 text-[2rem] w-full text-center text-white">
            {weaponsData[gunId - 1].name}
          </h2>
        </div>
      )}
    </div>
  );
};

export default Inventory;
