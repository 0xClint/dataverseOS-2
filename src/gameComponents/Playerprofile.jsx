import React, { useMemo, useRef, useEffect, useState } from "react";
import { Color, MeshStandardMaterial } from "three";
import { useGraph } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";

export function PlayerProfile({ color }) {
  const group = useRef();
  const { scene, materials, animations } = useGLTF("/models/modelProfile.glb");

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  const { nodes } = useGraph(clone);
  // console.log(nodes);
  const { actions } = useAnimations(animations, group);

  const playerColorMaterial = useMemo(
    () =>
      new MeshStandardMaterial({
        color: new Color(color),
      }),
    [color]
  );

  useEffect(() => {
    console.log(color);
    nodes.Head.traverse((child) => {
      if (child.isMesh && child.material.name === "Character_Main") {
        child.material = new MeshStandardMaterial({
          color,
        });
      }
    });
  }, [color]);
  return (
    <group ref={group} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <group name="Body">
            <skinnedMesh
              name="Cube004"
              geometry={nodes.Cube004.geometry}
              material={materials.Skin}
              skeleton={nodes.Cube004.skeleton}
            />
            <skinnedMesh
              name="Cube004_1"
              geometry={nodes.Cube004_1.geometry}
              material={materials.DarkGrey}
              skeleton={nodes.Cube004_1.skeleton}
            />
            <skinnedMesh
              name="Cube004_2"
              geometry={nodes.Cube004_2.geometry}
              material={materials.Pants}
              skeleton={nodes.Cube004_2.skeleton}
            />
            <skinnedMesh
              name="Cube004_3"
              geometry={nodes.Cube004_3.geometry}
              material={materials.Character_Main}
              skeleton={nodes.Cube004_3.skeleton}
            />
            <skinnedMesh
              name="Cube004_4"
              geometry={nodes.Cube004_4.geometry}
              material={materials.Black}
              skeleton={nodes.Cube004_4.skeleton}
            />
          </group>
          <primitive object={nodes.Root} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/modelProfile.glb");
