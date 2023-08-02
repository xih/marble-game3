import { FPSControls } from "@unegma/react-three-fpscontrols";

const FPSControlsInterface = () => {
  return (
    <FPSControls
      camProps={{
        makeDefault: true,
        fov: 80,
        position: [0, 2.537, 0.7],
      }}
      orbitProps={{
        target: [0, 2.537, 0],
      }}
      enableJoystick
      enableKeyboard
    />
  );
};

export default FPSControlsInterface;
