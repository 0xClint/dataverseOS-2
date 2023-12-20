import React, { useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";

const weaponsData = [
  {
    id: 1,
    name: "Pistol",
    src: "weapons/Pistol.glb",
  },
  {
    id: 2,
    name: "Sniper",
    src: "weapons/sniper.glb",
  },
  {
    id: 3,
    name: "AK",
    src: "weapons/AK.glb",
  },
  {
    id: 4,
    name: "Revolver_Small",
    src: "weapons/Revolver_Small.glb",
  },
  {
    id: 5,
    name: "Revolver",
    src: "weapons/Revolver.glb",
  },
  {
    id: 6,
    name: "ShortCannon",
    src: "weapons/ShortCannon.glb",
  },
  {
    id: 7,
    name: "Shotgun",
    src: "weapons/Shotgun.glb",
  },
  {
    id: 8,
    name: "SMG",
    src: "weapons/SMG.glb",
  },
];

const WeaponProfile = ({ counter, setCounter }) => {
  useEffect(() => {
    weaponsData.forEach((wp) => {
      console.log(wp);
      // const isCurrentWeapon = wp === weapon;
      // nodes[wp].visible = isCurrentWeapon;
    });
  }, [counter]);

  const { nodes, scene } = useGLTF("weapons/temp.glb");
  nodes.Sniper.visible = false;
  nodes.Shotgun.visible = false;
  nodes.ShortCannon.visible = false;
  nodes.SMG.visible = false;
  nodes.Revolver.visible = false;
  nodes.Revolver_Small.visible = false;
  nodes.Pistol.visible = false;
  // nodes.AK.visible = false;
  console.log(nodes);
  // const wp0 = useGLTF(weaponsData[counter].src);
  return <primitive object={scene} />;
};

export default WeaponProfile;
