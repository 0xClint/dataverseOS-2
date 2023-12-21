import { Loader, PerformanceMonitor, SoftShadows } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Physics } from "@react-three/rapier";
import { Suspense, useState } from "react";
import { Experience } from "../gameComponents/Experience";
import { Leaderboard } from "../gameComponents/Leaderboard";
import { useStore } from "../hooks/useStore";

const Game = () => {
  const [downgradedPerformance, setDowngradedPerformance] = useState(false);

  const [dead] = useStore((state) => [state.dead]);

  return (
    <div className="h-screen w-screen">
      <Loader />
      <Leaderboard />
      {dead && (
        <div className="absolute z-10 w-screen h-screen make-flex bg-[#b0ceff3a]">
          <div className="card-container w-[400px] h-[200px] py-6 flex flex-col">
            <h1 className="text-center text-[2.5rem] font-bold mb-10">
              Game Over
            </h1>
            <button className="btn bg-blue-600 text-white mx-1 hover:scale-105">
              Go home
            </button>
          </div>
        </div>
      )}
      <Canvas
        shadows
        camera={{ position: [0, 30, 0], fov: 30, near: 2 }}
        dpr={[1, 1.5]} // optimization to increase performance on retina/4k devices
      >
        <color attach="background" args={["#242424"]} />
        <SoftShadows size={42} />

        <PerformanceMonitor
          // Detect low performance devices
          onDecline={(fps) => {
            setDowngradedPerformance(true);
          }}
        />
        <Suspense>
          <Physics>
            <Experience downgradedPerformance={downgradedPerformance} />
          </Physics>
        </Suspense>
        {!downgradedPerformance && (
          // disable the postprocessing on low-end devices
          <EffectComposer disableNormalPass>
            <Bloom luminanceThreshold={1} intensity={1.5} mipmapBlur />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
};

export default Game;
