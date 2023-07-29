import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Physics, RapierRigidBody, RigidBody, quat } from "@react-three/rapier";
import { useRef } from "react";

import * as THREE from "three"


const BlockStart = ({ position} : {position: [number, number, number]}) => {
  return (
    <>
      <group position={position}>
        <mesh scale={[4, 0.2, 4]} receiveShadow>
          <boxGeometry args={[1, 1, 1]}/>
          <meshBasicMaterial color="limegreen"/>
        </mesh>
      </group>
    </>
  )
}

const BlockMiddle = ({ position} : {position: [number, number, number]}) => {
  return (
    <>
      <group position={position}>
        <mesh scale={[4, 0.2, 4]} receiveShadow>
          <boxGeometry args={[1, 1, 1]}/>
          <meshBasicMaterial color="yellowgreen"/>
        </mesh>
      </group>
    </>
  )
}


const BlockEnd = ({ position} : {position: [number, number, number]}) => {
  return (
    <>
      <group position={position}>
        <mesh scale={[4, 0.2, 4]} receiveShadow>
          <boxGeometry args={[1, 1, 1]}/>
          <meshBasicMaterial color="limegreen"/>
        </mesh>
      </group>
    </>
  )
}



const BlockSpinner = ({ position}: {position: [number, number, number ]}) => {


  const blockRef = useRef<RapierRigidBody>(null!)


  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()
    // get the euler rotation 

    const eulerRotation = new THREE.Euler(0, time, 0)
    const quaternionRotation = new THREE.Quaternion()
    quaternionRotation.setFromEuler(eulerRotation)
  
    blockRef.current.setNextKinematicRotation(quaternionRotation)

  })


  return <>
  <RigidBody type="kinematicPosition" ref={blockRef} >
    <mesh scale={[4,0.2,1]} position={[0, 0.5, 0]}>
      <boxGeometry />
      <meshStandardMaterial color="red"/>
    </mesh>
  </RigidBody>
  </>
}


const Level = () => {

  const numBlocks = 5


  // make 5 
  // const Arr = [].

  return (
    <>
      <OrbitControls makeDefault />
      <directionalLight position={[1, 2, 3]} />
      <ambientLight intensity={1.5} />
      <Physics>
        <BlockStart position={[0,0,0]}/>
        <BlockMiddle position={[0, 0, -4]}/>
        <BlockSpinner position={[0, 0, -4]}/> 
        <BlockEnd position={[0,0,-8]}/>
      </Physics>
    </>
  );
};

export default Level;
