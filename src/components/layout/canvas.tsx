import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { A11yAnnouncer } from "@react-three/a11y";
import {
  KeyboardControls,
  OrbitControls,
  Preload,
  Stats,
} from "@react-three/drei";
import * as THREE from "three";
import Interface from "../canvas/Game/Interface";
// import FPSControlsInterface from "../canvas/Game/FPSControlsInterface";

const Controls = () => {
  const control = useRef(null);
  // return <OrbitControls ref={control} />;
};

const CanvasWrapper = ({ children }) => {
  return (
    <>
      <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "KeyW"] },
          { name: "backward", keys: ["ArrowDown", "KeyS"] },
          { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
          { name: "rightward", keys: ["ArrowRight", "KeyD"] },
          { name: "jump", keys: ["Space"] },
        ]}
      >
        <Canvas
          shadows
          dpr={2}
          flat
          // camera={{
          //   fov: 45,
          //   near: 0.1,
          //   far: 200,
          //   position: [2.5, 4, 6],
          // }}
          gl={{
            antialias: false,
            toneMapping: THREE.ACESFilmicToneMapping,
            outputColorSpace: THREE.SRGBColorSpace,
          }}
          // Is this deprecated or typed wrong? Ignoring for now.
          // @ts-ignore
          mode="concurrent"
          style={{
            position: "absolute",
            top: 0,
            overflow: "hidden",
          }}
        >
          {/* <FPSControlsInterface /> */}
          <Stats />
          {/* <Controls /> */}
          <Preload all />
          {children}
        </Canvas>
        <Interface />
        <A11yAnnouncer />
      </KeyboardControls>
    </>
  );
};

export default CanvasWrapper;
