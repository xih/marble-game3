import { Physics } from "@react-three/rapier";
import Level from "./Level";
import Player from "./Player";

const GameExperience = () => {
  return (
    <>
      <Physics debug>
        <Player />
        <Level />
      </Physics>
    </>
  );
};

export default GameExperience;
