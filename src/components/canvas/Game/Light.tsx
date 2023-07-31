import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { DirectionalLight } from "three";

const Light = () => {
  const light = useRef<DirectionalLight>(null);

  useFrame((state, delta) => {
    // move the light position on the z axis
    // light.current.position.z = state.camera.position.z + 1 - 4;
    // light.current.target.position.z = state.camera.position.z - 4;
    // light.current.updateMatrixWorld();
    light.current?.position.setZ(state.camera.position.z + 1 - 4);
    light.current?.target.position.setZ(state.camera.position.z - 4);
    light.current?.target.updateMatrixWorld();
  });

  return (
    <>
      <directionalLight
        ref={light}
        castShadow
        position={[4, 4, 1]}
        intensity={2}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
      />
      <ambientLight intensity={1.5} />
    </>
  );
};

export default Light;
