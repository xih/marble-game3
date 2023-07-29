import { OrbitControls, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Physics, RapierRigidBody, RigidBody, quat } from "@react-three/rapier";
import { useRef, useState } from "react";

import * as THREE from "three"


type BlockDefinition = (props: {
  position: [x: number,y: number, z: number]}) => JSX.Element

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




const BlockEnd = ({ position} : {position: [number, number, number]}) => {
  const hamburer = useGLTF("./hamburger2.glb")
  return (
    <>
      <group position={position}>
        <mesh scale={[4, 0.2, 4]} receiveShadow>
          <boxGeometry args={[1, 1, 1]}/>
          <meshBasicMaterial color="limegreen"/>
        </mesh>
        <primitive object={hamburer.scene} scale={0.2}/>
      </group>
    </>
  )
}


const BlockSpinner = ({ position}: {position: [number, number, number ]}): JSX.Element => {
  const blockRef = useRef<RapierRigidBody>(null!)
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()
    const eulerRotation = new THREE.Euler(0, time, 0)
    const quaternionRotation = new THREE.Quaternion()
    quaternionRotation.setFromEuler(eulerRotation)
    blockRef.current.setNextKinematicRotation(quaternionRotation)

  })


  return <group position={position}>
 <mesh scale={[4, 0.2, 4]} receiveShadow>
          <boxGeometry args={[1, 1, 1]}/>
          <meshBasicMaterial color="yellowgreen"/>
        </mesh>
  <RigidBody type="kinematicPosition" ref={blockRef}  >
    <mesh scale={[4,0.2,1]} position={[0, 0.5, 0]}>
      <boxGeometry />
      <meshStandardMaterial color="red"/>
    </mesh>
  </RigidBody>
  </group>
}

const BlockGate = ({ position}: {position: [number, number, number ]}): JSX.Element => {
  const obstacle = useRef<RapierRigidBody>(null!)
  const [timeOffset] = useState<number>(() => Math.random() * 2 * Math.PI)

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()
    // const eulerRotation = new THREE.Euler(0, time, 0)
    // const quaternionRotation = new THREE.Quaternion()
    // quaternionRotation.setFromEuler(eulerRotation)

    const y = Math.sin(time + timeOffset) + 1.15

    const translationVector = new THREE.Vector3(0, Math.floor(time) + 2, 0)
    obstacle.current.setNextKinematicTranslation({
      x: position[0],
      y: position[1] + y,
      z: position[2]
    })

  })


  return <>
  <group position={position} >
  <mesh scale={[4, 0.2, 4]} receiveShadow>
          <boxGeometry args={[1, 1, 1]}/>
          <meshBasicMaterial color="yellowgreen"/>
        </mesh>
  <RigidBody type="kinematicPosition" ref={obstacle} >
    <mesh scale={[4,0.2,1]} position={[0, 0.5, 0]}>
      <boxGeometry />
      <meshStandardMaterial color="red"/>
    </mesh>
  </RigidBody>
  </group>
  </>
}


const Level = () => {

  const numBlocks = 5

  const blocks: BlockDefinition[] = []

  const types = [BlockSpinner, BlockGate]

  for (let i = 0; i < numBlocks; i++ ) {
    // console.log(Math.floor(Math.random() * types.length))
    const type = types[Math.floor(Math.random() * types.length)]
    if(!!type) {
      blocks.push(type)
    }
  }


  console.log(blocks)

  return (
    <>
      <OrbitControls makeDefault />
      <directionalLight position={[1, 2, 3]} />
      <ambientLight intensity={1.5} />
      <Physics>
        <BlockStart position={[0,0,0]}/>
        {blocks.map((Block, index) => {
           return <Block key={index} position={[0,0, -(index + 1) * 4]} />
        })}
        <BlockEnd position={[0,0,(numBlocks + 1) * -4]}/>
      </Physics>
    </>
  );
};

export default Level;
