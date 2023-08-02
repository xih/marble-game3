import nipplejs from "nipplejs";
import { useEffect, useMemo, useRef } from "react";

const JoystickControls = () => {
  // var options = {
  //   zone: document.getElementById("joystick"),
  // };

  const divRef = useRef<HTMLDivElement>(null);
  const firstRenderRef = useRef(true);
  // let joysticks = useRef<divRef>(null);

  let joysticks = {
    static: {
      zone: divRef.current,
      mode: "static",
      position: {
        left: "100px",
        top: "100px",
      },
      color: "blue",
    },
  };

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      createNipple("static");
    } else if (divRef.current) {
      joysticks.static.zone = divRef.current;
    }
  }, [divRef]);

  let joystick;

  function createNipple(evt) {
    var type =
      typeof evt === "string" ? evt : evt.target.getAttribute("data-type");
    if (joystick) {
      joystick.destroy();
    }

    if (joysticks.static.zone) {
      console.log(joysticks[type], "joysticks[type]----!");
      nipplejs.create(joysticks[type]);
      joystick = nipplejs.create(joysticks[type]);
    }
    //bindNipple();

    console.log(joystick);
    return joystick;
  }

  // var manager = nipplejs.create(options);
  return (
    <div ref={divRef} className="absolute top-0 right-0 z-10" id="joystick">
      {createNipple("static")}
    </div>
  );
};

export default JoystickControls;
