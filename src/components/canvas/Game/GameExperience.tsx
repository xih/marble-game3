import { Physics } from "@react-three/rapier";
import Level from "./Level";
import Player from "./Player";
import Light from "./Light";

const GameExperience = () => {
  return (
    <>
      <Physics debug>
        <Player />
        <Level />
        <Light />
      </Physics>
    </>
  );
};

export default GameExperience;
