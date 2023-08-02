import GameExperience from "@/components/canvas/Game/GameExperience";
import useStore from "@/helpers/store";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Shader from "@/components/canvas/ShaderExample/ShaderExample";
import { KeyboardControls } from "@react-three/drei";
import Interface from "@/components/canvas/Game/Interface";

// Prefer dynamic import for production builds
// But if you have issues and need to debug in local development
// comment these out and import above instead
// https://github.com/pmndrs/react-three-next/issues/49
// const Shader = dynamic(
//   () => import("@/components/canvas/ShaderExample/ShaderExample"),
//   {
//     ssr: false,
//   }
// );

// DOM elements here
const DOM = () => {
  return (
    <>
      {/* <Interface /> */}
      <div id="mobileInterface" className="noSelect">
        <div id="joystickWrapper1"></div>
      </div>
    </>
  );
};

// Canvas/R3F components here
const R3F = () => {
  // Example of using the router to change pages
  // It can also be inside R3F component (see `two.tsx` and `Box.tsx`)
  const { router } = useStore();
  const handleOnClick = () => {
    router.push("/two");
  };

  return (
    <>
      {/* <Shader onClick={handleOnClick} /> */}
      <GameExperience />
    </>
  );
};

export default function Page() {
  return (
    <>
      <DOM />
      <R3F />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      title: "Welcome!",
    },
  };
}
