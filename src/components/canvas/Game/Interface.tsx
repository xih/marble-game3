import useGame from "@/stores/useGame";
import { useKeyboardControls } from "@react-three/drei";
import { addEffect, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";

const Interface = () => {
  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const jump = useKeyboardControls((state) => state.jump);

  const restart = useGame((state) => state.restart);
  const phase = useGame((state) => state.phase);

  const forwardTouch = useGame((state) => state.forwardTouch);
  const forwardTouchOnKeyDown = useGame((state) => state.forwardTouchOnKeyDown);
  const forwardTouchOnKeyUp = useGame((state) => state.forwardTouchOnKeyUp);

  const rightPointer = useGame((state) => state.rightPointer);
  const rightPointerKeyDown = useGame((state) => state.rightPointerKeyDown);
  const rightPointerKeyUp = useGame((state) => state.rightPointerKeyUp);

  const leftPointer = useGame((state) => state.leftPointer);
  const leftPointerKeyDown = useGame((state) => state.leftPointerKeyDown);
  const leftPointerKeyUp = useGame((state) => state.leftPointerKeyUp);

  const backPointer = useGame((state) => state.backPointer);
  const backPointerKeyDown = useGame((state) => state.backPointerKeyDown);
  const backPointerKeyUp = useGame((state) => state.backPointerKeyUp);

  const jumpPressed = useGame((state) => state.jumpPressed);
  const jumpKeyDown = useGame((state) => state.jumpKeyDown);
  const jumpKeyUp = useGame((state) => state.jumpKeyUp);

  const [subscribeKeys, getKeys] = useKeyboardControls();

  // time section work
  const time = useRef<HTMLDivElement>();

  const startTime = useGame((state) => state.startTime);
  const endTime = useGame((state) => state.endTime);

  useEffect(() => {
    // const elapsedTime =
    const unsubscribeEffect = addEffect(() => {
      let elapsedTime = 0;
      if (phase === "playing") {
        elapsedTime = Date.now() - startTime;
      }
      if (phase === "ended") {
        elapsedTime = endTime - startTime;
      }
      elapsedTime /= 1000;
      const elapsedTimeString = elapsedTime.toFixed(2);

      if (time.current) {
        time.current.textContent = elapsedTimeString;
      }
    });

    return () => {
      unsubscribeEffect();
    };
  });

  return (
    <div className="fixed top-0 left-0 w-full h-full select-none pointer-events-none overflow-y-scroll overflow-hidden">
      <div ref={time} className="time">
        0.00
      </div>

      {phase === "ended" && (
        <div className="restart" onClick={restart}>
          Restart
        </div>
      )}

      {/* Controls */}
      <div className="controls select-none">
        <div className="raw">
          <div
            onPointerDown={() => forwardTouchOnKeyDown()}
            onPointerUp={() => forwardTouchOnKeyUp()}
            className={`key ${forward || forwardTouch ? "active" : ""}`}
          ></div>
        </div>
        <div className="raw">
          <div
            onPointerDown={() => leftPointerKeyDown()}
            onPointerUp={() => leftPointerKeyUp()}
            className={`key ${leftward || leftPointer ? "active" : ""}`}
          ></div>
          <div
            onPointerDown={() => backPointerKeyDown()}
            onPointerUp={() => backPointerKeyUp()}
            className={`key ${backward || backPointer ? "active" : ""}`}
          ></div>
          <div
            onPointerDown={() => rightPointerKeyDown()}
            onPointerUp={() => rightPointerKeyUp()}
            className={`key ${rightward || rightPointer ? "active" : ""}`}
          ></div>
        </div>
        <div className="raw">
          <div
            onPointerDown={() => {
              jumpKeyDown();
            }}
            onPointerUp={() => {
              jumpKeyUp();
            }}
            className={`key large ${jump || jumpPressed ? "active" : ""}`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Interface;
