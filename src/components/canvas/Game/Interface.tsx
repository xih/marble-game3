import useGame from "@/stores/useGame";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Interface = () => {
  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const jump = useKeyboardControls((state) => state.jump);

  const restart = useGame((state) => state.restart);

  const forwardTouchOnKeyDown = useGame((state) => state.forwardTouchOnKeyDown);
  const forwardTouchOnKeyUp = useGame((state) => state.forwardTouchOnKeyUp);
  const forwardTouch = useGame((state) => state.forwardTouch);

  const [subscribeKeys, getKeys] = useKeyboardControls();

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-y-scroll overflow-hidden">
      <div className="time">0.00</div>

      <div className="restart" onClick={restart}>
        Restart
      </div>

      {/* Controls */}
      <div className="controls">
        <div className="raw">
          <div
            onMouseDown={() => forwardTouchOnKeyDown()}
            onMouseUp={() => forwardTouchOnKeyUp()}
            className={`key ${forward || forwardTouch ? "active" : ""}`}
          ></div>
        </div>
        <div className="raw">
          <div className={`key ${rightward ? "active" : ""}`}></div>
          <div className={`key ${backward ? "active" : ""}`}></div>
          <div className={`key ${leftward ? "active" : ""}`}></div>
        </div>
        <div className="raw">
          <div className={`key large ${jump ? "active" : ""}`}></div>
        </div>
      </div>
    </div>
  );
};

export default Interface;
