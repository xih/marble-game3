// import { useEffect, useRef } from "react";

// const NippleControls = () => {
//   const nippleZoneRef = useRef();

//   useEffect(() => {
//     const nippleFn = async () => {
//       let nippleManager = (await import("nipplejs")).default.create({
//         mode: "dynamic",
//         zone: nippleZoneRef.current as HTMLElement,
//         position: { bottom: "100px", left: "100px" },
//       });
//       nippleManager.on("move", () => {
//         console.log("hello");
//       });
//     };

//     nippleFn();
//   }, []);

//   return <div ref={nippleZoneRef}></div>;
// };

// export default NippleControls;
