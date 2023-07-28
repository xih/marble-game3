import { OrbitControls } from "@react-three/drei";

const Level = () => {
  return (
    <>
      <OrbitControls makeDefault />
      <directionalLight position={[1, 2, 3]} />
      <ambientLight intensity={1.5} />
      <mesh>
        <boxGeometry />
        <meshStandardMaterial color="yellow" />
      </mesh>
    </>
  );
};

export default Level;
