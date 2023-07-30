import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Block } from "@react-three/fiber/dist/declarations/src/core/utils";
import {
  CuboidCollider,
  Physics,
  RapierRigidBody,
  RigidBody,
  quat,
} from "@react-three/rapier";
import { useRef, useState } from "react";

import * as THREE from "three";

type BlockDefinition = (props: {
  position: [x: number, y: number, z: number];
}) => JSX.Element;

const BlockStart = ({ position }: { position: [number, number, number] }) => {
  return (
    <>
      <group position={position}>
        <mesh scale={[4, 0.2, 4]} receiveShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="limegreen" />
        </mesh>
      </group>
    </>
  );
};

const BlockEnd = ({ position }: { position: [number, number, number] }) => {
  const hamburer = useGLTF("./hamburger2.glb");
  return (
    <>
      <group position={position}>
        <mesh scale={[4, 0.2, 4]} receiveShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="limegreen" />
        </mesh>
        <RigidBody type="fixed" colliders="hull" restitution={0.2} friction={0}>
          <primitive object={hamburer.scene} scale={0.2} />
        </RigidBody>
      </group>
    </>
  );
};

const BlockSpinner = ({
  position,
}: {
  position: [number, number, number];
}): JSX.Element => {
  const blockRef = useRef<RapierRigidBody>(null!);

  // make the block spinner spin at different times
  // const freq = Math.random() * 5

  const [speed] = useState<number>(() => {
    return (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1);
  });

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const eulerRotation = new THREE.Euler(0, time * speed, 0);
    const quaternionRotation = new THREE.Quaternion();
    quaternionRotation.setFromEuler(eulerRotation);
    blockRef.current.setNextKinematicRotation(quaternionRotation);
  });

  return (
    <group position={position}>
      <mesh scale={[4, 0.2, 4]} receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="yellowgreen" />
      </mesh>
      <RigidBody type="kinematicPosition" ref={blockRef}>
        <mesh scale={[3.5, 0.3, 0.3]} position={[0, 0.5, 0]}>
          <boxGeometry />
          <meshStandardMaterial color="red" />
        </mesh>
      </RigidBody>
    </group>
  );
};

const BlockGate = ({
  position,
}: {
  position: [number, number, number];
}): JSX.Element => {
  const obstacle = useRef<RapierRigidBody>(null!);
  const [timeOffset] = useState<number>(() => Math.random() * 2 * Math.PI);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    // const eulerRotation = new THREE.Euler(0, time, 0)
    // const quaternionRotation = new THREE.Quaternion()
    // quaternionRotation.setFromEuler(eulerRotation)

    const y = Math.sin(time + timeOffset) + 1.15;

    const translationVector = new THREE.Vector3(0, Math.floor(time) + 2, 0);
    obstacle.current.setNextKinematicTranslation({
      x: position[0],
      y: position[1] + y,
      z: position[2],
    });
  });

  return (
    <>
      <group position={position}>
        <mesh scale={[4, 0.2, 4]} receiveShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="yellowgreen" />
        </mesh>
        <RigidBody type="kinematicPosition" ref={obstacle}>
          <mesh scale={[4, 0.2, 1]} position={[0, 0.5, 0]}>
            <boxGeometry />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>
      </group>
    </>
  );
};

const BlockAxe = ({
  position,
}: {
  position: [number, number, number];
}): JSX.Element => {
  const obstacle = useRef<RapierRigidBody>(null!);
  const [timeOffset] = useState<number>(() => Math.random() * 2 * Math.PI);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const x = Math.sin(time + timeOffset) + 1.25;
    obstacle.current.setNextKinematicTranslation({
      x: position[0] + x,
      y: position[1] + 0.75,
      z: position[2],
    });
  });

  return (
    <>
      <group position={position}>
        {/* floor */}
        <mesh scale={[4, 0.2, 4]} receiveShadow position={[0, -0.1, 0]}>
          <boxGeometry />
          <meshBasicMaterial color="yellowgreen" />
        </mesh>
        <RigidBody
          type="kinematicPosition"
          ref={obstacle}
          position={position}
          restitution={0.2}
          friction={0}
        >
          <mesh>
            <boxGeometry args={[1.5, 1.5, 0.3]} />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>
      </group>
    </>
  );
};

// add bounds to the game

const Bounds = ({ length = 1 }) => {
  return (
    <>
      <RigidBody type="fixed">
        {/* right side */}
        <mesh position={[2, 0.75, -(length * 2) + 2]}>
          <boxGeometry args={[0.3, 1.5, length * 4]} />
          <meshStandardMaterial color="orange" />
        </mesh>
        {/* left side */}
        <mesh receiveShadow position={[-2, 0.75, -(length * 2) + 2]}>
          <boxGeometry args={[0.3, 1.5, length * 4]} />
          <meshStandardMaterial color="orange" />
        </mesh>

        {/* back position */}
        <mesh position={[0, 0.75, length * -4 + 2]} receiveShadow>
          <boxGeometry args={[4, 1.5, 0.3]} />
          <meshStandardMaterial color="orange" />
        </mesh>

        {/* make a cuboid collider for the flow */}
        <CuboidCollider
          restitution={0.2}
          friction={0}
          args={[2, 0.1, 2 * length]}
          position={[0, -0.1, -(length * 2) + 2]}
        />
      </RigidBody>
    </>
  );
};

const Level = () => {
  const numBlocks = 5;
  const blocks: BlockDefinition[] = [];
  const types = [BlockSpinner, BlockGate, BlockAxe];

  for (let i = 0; i < numBlocks; i++) {
    // console.log(Math.floor(Math.random() * types.length))
    const type = types[Math.floor(Math.random() * types.length)];
    if (!!type) {
      blocks.push(type);
    }
  }

  return (
    <>
      <directionalLight position={[1, 2, 3]} />
      <ambientLight intensity={1.5} />

      <Bounds length={numBlocks + 2} />
      <BlockStart position={[0, 0, 0]} />
      {blocks.map((Block, index) => {
        return <Block key={index} position={[0, 0, -(index + 1) * 4]} />;
      })}
      <BlockEnd position={[0, 0, (numBlocks + 1) * -4]} />
    </>
  );
};

export default Level;
