import { Physics } from "@react-three/rapier";
import Level from "./Level";
import Player from "./Player";
import Light from "./Light";
import useGame from "@/stores/useGame";

const GameExperience = () => {
  const blockCounts = useGame((state) => state.blocksCount);
  const blocksSeed = useGame((state) => state.blocksSeed);

  return (
    <>
      <Physics debug>
        <color args={["#bdedfc"]} attach="background" />
        <Player />
        <Level numBlocks={blockCounts} seed={blocksSeed} />
        <Light />
      </Physics>
    </>
  );
};

export default GameExperience;
