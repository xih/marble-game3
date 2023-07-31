import { Physics } from "@react-three/rapier";
import Level from "./Level";
import Player from "./Player";
import Light from "./Light";
import useGame from "@/stores/useGame";

const GameExperience = () => {
  const blockCounts = useGame((state) => state.blocksCount);

  return (
    <>
      <Physics debug>
        <Player />
        <Level numBlocks={blockCounts} />
        <Light />
      </Physics>
    </>
  );
};

export default GameExperience;
