import useGame from "@/stores/useGame";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody, useRapier } from "@react-three/rapier";
import { useControls } from "leva";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { type Vector3 } from "three";

const Player = () => {
  const ball = useRef<RapierRigidBody>(null!);
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const { rapier, world } = useRapier();
  const [smoothedCameraPosition, setSmoothedCameraPosition] = useState(
    () => new THREE.Vector3(10, 10, 10)
  );
  const [smoothedCameraTarget, setSmoothedCameraTarget] = useState(
    () => new THREE.Vector3()
  );

  const start = useGame((state) => state.start);
  const end = useGame((state) => state.end);
  const restart = useGame((state) => state.restart);
  const blocksCount = useGame((state) => state.blocksCount);

  // const forwardDown = useGame()
  // const forwardUp = useGame((state) => state.fo)

  const forwardTouch = useGame((state) => state.forwardTouch);

  const { impulseKnob, torqueKnob } = useControls({
    impulseKnob: { value: 0.6, min: 0.1, max: 1, step: 0.1 },
    torqueKnob: { value: 0.2, min: 0.1, max: 1, step: 0.1 },
  });

  const jump = () => {
    const origin = ball.current.translation();
    origin.y -= 0.31;
    const direction = { x: 0, y: -1, z: 0 };

    const ray = new rapier.Ray(origin, direction);
    const hit = world.castRay(ray, 10, true);

    if (hit.toi < 0.15) {
      ball.current.applyImpulse({ x: 0, y: 0.5, z: 0 }, true);
    }
  };

  const reset = () => {
    ball.current.setTranslation({ x: 0, y: 4, z: 0 }, true);
    ball.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
    ball.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
  };

  useEffect(() => {
    const unsubscribeGame = useGame.subscribe(
      (state) => {
        return state.phase;
      },
      (value) => {
        if (value === "ready") {
          reset();
        }
      }
    );

    const unsubscribeJump = subscribeKeys(
      (state) => {
        return state.jump;
      },
      (value) => {
        if (value) {
          jump();
        }
      }
    );

    const unsubscribeAny = subscribeKeys(() => {
      start();
    });

    return () => {
      unsubscribeJump();
      unsubscribeAny();
      unsubscribeGame();
    };
  }, []);

  useFrame((state, delta) => {
    // CONTROLS
    const { forward, backward, leftward, rightward } = getKeys();
    // console.log(keys)

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = impulseKnob * delta;
    const torqueStrength = torqueKnob * delta;

    if (forward || forwardTouch) {
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

    // Camera
    // find the position of the ball
    const ballPosition = ball.current.translation() as Vector3;

    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(ballPosition);

    cameraPosition.z += 2.25;
    cameraPosition.y += 0.65;

    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(ballPosition);
    cameraTarget.y += 0.25;

    smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
    smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

    state.camera.position.copy(smoothedCameraPosition);
    state.camera.lookAt(smoothedCameraTarget);

    // PHASES
    if (ballPosition.z < -(blocksCount * 4 + 2)) {
      end();
    }

    if (ballPosition.y < -4) {
      restart();
    }
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
      <mesh castShadow>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial flatShading color="purple" />
      </mesh>
    </RigidBody>
  );
};

export default Player;
