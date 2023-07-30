import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useControls } from "leva";
import { useRef } from "react";

const Player = () => {
  const ball = useRef<RapierRigidBody>(null!);

  const [subscribeKeys, getKeys] = useKeyboardControls();

  const { impulseKnob, torqueKnob } = useControls({
    impulseKnob: { value: 0.6, min: 0.1, max: 1, step: 0.1 },
    torqueKnob: { value: 0.2, min: 0.1, max: 1, step: 0.1 },
  });

  useFrame((state, delta) => {
    const { forward, backward, leftward, rightward } = getKeys();
    // console.log(keys)

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = impulseKnob * delta;
    const torqueStrength = torqueKnob * delta;

    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }

    if (backward) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }

    if (rightward) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
    }
    if (leftward) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
    }

    ball.current.applyImpulse(impulse, true);
    ball.current.applyTorqueImpulse(torque, true);
  });

  return (
    <RigidBody
      ref={ball}
      canSleep={false}
      colliders="ball"
      position={[0, 1, 0]}
      restitution={0.2}
      friction={1}
      linearDamping={0.5}
      angularDamping={0.5}
    >
      <mesh>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial flatShading color="purple" />
      </mesh>
    </RigidBody>
  );
};

export default Player;
